import { render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import ThemeProvider from '../ThemeProvider';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    // Store theme-specific props in data attributes to avoid React DOM warnings
    const { attribute, defaultTheme, enableSystem, disableTransitionOnChange, ...otherProps } =
      props;

    return (
      <div
        data-testid="theme-provider"
        data-attribute={String(attribute)}
        data-default-theme={String(defaultTheme)}
        data-enable-system={String(enableSystem)}
        data-disable-transition-on-change={String(disableTransitionOnChange)}
        {...otherProps}
      >
        {children}
      </div>
    );
  },
  useTheme: jest.fn(),
}));

// Test component to verify the theme provider context
function TestComponent() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'system',
      setTheme: jest.fn(),
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
      systemTheme: 'light',
      forcedTheme: undefined,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-component">Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByTestId('child-component')).toHaveTextContent('Test Child');
  });

  test('configures NextThemesProvider with correct props', () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('data-attribute', 'class');
    expect(themeProvider).toHaveAttribute('data-default-theme', 'system');
    expect(themeProvider).toHaveAttribute('data-enable-system', 'true');
    expect(themeProvider).toHaveAttribute('data-disable-transition-on-change', 'false');
  });

  test('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    expect(screen.getByTestId('set-dark')).toBeInTheDocument();
    expect(screen.getByTestId('set-light')).toBeInTheDocument();
  });

  test('handles theme changes', () => {
    const mockSetTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
      systemTheme: 'light',
      forcedTheme: undefined,
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // The useTheme hook should be called within the provider context
    expect(mockUseTheme).toHaveBeenCalled();
  });

  test('renders with different themes', () => {
    const themes = ['light', 'dark', 'system'];

    themes.forEach(theme => {
      mockUseTheme.mockReturnValue({
        theme,
        setTheme: jest.fn(),
        resolvedTheme: theme === 'system' ? 'light' : theme,
        themes: ['light', 'dark', 'system'],
        systemTheme: 'light',
        forcedTheme: undefined,
      });

      const { rerender } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent(theme);

      rerender(
        <ThemeProvider>
          <div>Different content</div>
        </ThemeProvider>
      );
    });
  });

  test('accepts and renders multiple children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  test('handles empty children', () => {
    render(<ThemeProvider>{null}</ThemeProvider>);

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
    expect(themeProvider).toBeEmptyDOMElement();
  });
});
