import '@testing-library/jest-dom';

// Extend Jest matchers
import 'jest';

declare module 'jest' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(...classNames: string[]): R;
    toHaveTextContent(text: string | RegExp): R;
    toContainElement(element: HTMLElement | null): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}
