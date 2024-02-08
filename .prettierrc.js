module.exports = {
  bracketSpacing: true,
  endOfLine: 'lf',
  objectWrap: 'preserve',
  plugins: ['prettier-plugin-solidity'],
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-solidity'],
  overrides: [
    {
      files: '*.sol',
      options: {
        bracketSpacing: true,
        parser: 'solidity-parse',
        printWidth: 120,
        singleQuote: false,
        tabWidth: 4,
        useTabs: false,
      },
    },
  ],
};
