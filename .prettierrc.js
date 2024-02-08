module.exports = {
  bracketSpacing: true,
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
        printWidth: 160,
        singleQuote: false,
        tabWidth: 4,
        useTabs: false,
      },
    },
  ],
};
