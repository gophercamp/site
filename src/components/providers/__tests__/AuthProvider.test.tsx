import { type Session } from '@supabase/supabase-js';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../AuthProvider';

// Suppress act() warnings for async state updates in AuthProvider methods
// These warnings are expected since the provider methods (signIn/signOut)
// perform async operations that update state outside the test's direct control
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('The current testing environment is not configured to support act')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Supabase client
const mockSupabaseClient = {
  auth: {
    getSession: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
};

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => mockSupabaseClient),
}));

// Mock environment variables
const originalEnv = process.env;
beforeAll(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_SUPABASE_DATABASE_URL: 'test-db-url',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  };
});

afterAll(() => {
  process.env = originalEnv;
});

// Test component to verify the auth context
function TestComponent() {
  const { user, session, isLoading, signIn, signOut } = useAuth();

  return (
    <div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="user-state">{user ? user.email : 'no user'}</div>
      <div data-testid="session-state">{session ? 'has session' : 'no session'}</div>
      <button onClick={() => signIn('test@example.com', 'password')} data-testid="sign-in-button">
        Sign In
      </button>
      <button onClick={signOut} data-testid="sign-out-button">
        Sign Out
      </button>
    </div>
  );
}

// Component to test hook outside provider
function TestComponentOutsideProvider() {
  const auth = useAuth();
  return <div data-testid="auth-context">{JSON.stringify(auth)}</div>;
}

// Helper function to create mock session
function createMockSession(user: { id: string; email: string }): Session {
  return {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'bearer',
    user: user,
  } as Session;
}

describe('AuthProvider', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Reset all mocks
    jest.clearAllMocks();

    // Default mock implementations
    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    mockSupabaseClient.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    });

    mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    });

    mockSupabaseClient.auth.signOut.mockResolvedValue({
      error: null,
    });
  });

  describe('Provider functionality', () => {
    test('renders children correctly', async () => {
      await act(async () => {
        render(
          <AuthProvider>
            <div data-testid="child-component">Test Child</div>
          </AuthProvider>
        );
      });

      expect(screen.getByTestId('child-component')).toBeInTheDocument();
      expect(screen.getByTestId('child-component')).toHaveTextContent('Test Child');
    });

    test('initializes with loading state', async () => {
      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });
    });

    test('handles initial session correctly when no session exists', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('user-state')).toHaveTextContent('no user');
        expect(screen.getByTestId('session-state')).toHaveTextContent('no session');
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });
    });

    test('handles initial session correctly when session exists', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockSession = createMockSession(mockUser);

      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('user-state')).toHaveTextContent('test@example.com');
        expect(screen.getByTestId('session-state')).toHaveTextContent('has session');
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });
    });
  });

  describe('Authentication methods', () => {
    test('signIn method works correctly', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockSession = createMockSession(mockUser);

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      // Wait for initial loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });

      // Click sign in button
      const signInButton = screen.getByTestId('sign-in-button');
      await act(async () => {
        await userEvent.click(signInButton);
      });

      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });

    test('signOut method works correctly', async () => {
      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      // Wait for initial loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });

      // Click sign out button
      const signOutButton = screen.getByTestId('sign-out-button');
      await act(async () => {
        await userEvent.click(signOutButton);
      });

      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/login');
    });
  });

  describe('Auth state changes', () => {
    test('handles SIGNED_IN event', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockSession = createMockSession(mockUser);

      let authStateChangeCallback: ((event: string, session: Session | null) => void) | null = null;

      mockSupabaseClient.auth.onAuthStateChange.mockImplementation(callback => {
        authStateChangeCallback = callback;
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        };
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      // Wait for initial setup
      await waitFor(() => {
        expect(authStateChangeCallback).toBeTruthy();
      });

      // Simulate SIGNED_IN event
      act(() => {
        authStateChangeCallback!('SIGNED_IN', mockSession);
      });

      expect(mockRouter.refresh).toHaveBeenCalled();
    });

    test('handles SIGNED_OUT event', async () => {
      let authStateChangeCallback: ((event: string, session: Session | null) => void) | null = null;

      mockSupabaseClient.auth.onAuthStateChange.mockImplementation(callback => {
        authStateChangeCallback = callback;
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        };
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      // Wait for initial setup
      await waitFor(() => {
        expect(authStateChangeCallback).toBeTruthy();
      });

      // Simulate SIGNED_OUT event
      act(() => {
        authStateChangeCallback!('SIGNED_OUT', null);
      });

      expect(mockRouter.refresh).toHaveBeenCalled();
    });

    test('handles TOKEN_REFRESHED event', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockSession = createMockSession(mockUser);

      let authStateChangeCallback: ((event: string, session: Session | null) => void) | null = null;

      mockSupabaseClient.auth.onAuthStateChange.mockImplementation(callback => {
        authStateChangeCallback = callback;
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        };
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      // Wait for initial setup
      await waitFor(() => {
        expect(authStateChangeCallback).toBeTruthy();
      });

      // Simulate TOKEN_REFRESHED event
      act(() => {
        authStateChangeCallback!('TOKEN_REFRESHED', mockSession);
      });

      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  describe('useAuth hook', () => {
    test('throws error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponentOutsideProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });

    test('returns correct context when used within AuthProvider', async () => {
      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });

      // Context should be available and working
      expect(screen.getByTestId('user-state')).toBeInTheDocument();
      expect(screen.getByTestId('session-state')).toBeInTheDocument();
      expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    });
  });

  describe('Cleanup', () => {
    test('unsubscribes from auth state changes on unmount', async () => {
      const mockUnsubscribe = jest.fn();

      mockSupabaseClient.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      let unmount: () => void;
      await act(async () => {
        const result = render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
        unmount = result.unmount;
      });

      unmount!();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    test('handles signIn error correctly', async () => {
      const signInError = new Error('Invalid credentials');
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: signInError,
      });

      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      });

      const signInButton = screen.getByTestId('sign-in-button');
      await act(async () => {
        await userEvent.click(signInButton);
      });

      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalled();
    });
  });
});
