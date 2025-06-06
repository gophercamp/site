/**
 * Prettier configuration for Gophercamp 2026 website
 * https://prettier.io/docs/en/options.html
 */

module.exports = {
  // Use single quotes instead of double quotes
  singleQuote: true,

  // Print semicolons at the ends of statements
  semi: true,

  // Specify the number of spaces per indentation-level (default: 2)
  tabWidth: 2,

  // Use spaces instead of tabs (default: true)
  useTabs: false,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures (default: 'es5')
  trailingComma: 'es5',

  // Print spaces between brackets in object literals (default: true)
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line
  // Using bracketSameLine which replaces the deprecated jsxBracketSameLine option
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter (default: 'avoid')
  arrowParens: 'avoid',

  // Line length that Prettier will wrap on (default: 80)
  printWidth: 100,

  // Specify the end of line (lf, crlf, or auto) (default: 'lf')
  endOfLine: 'lf',

  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',
};
