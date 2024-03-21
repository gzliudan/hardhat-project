module.exports = {
  bracketSpacing: true,
  endOfLine: 'lf',
  objectWrap: 'preserve',
  plugins: ['prettier-plugin-solidity'],
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.sol',
      options: {
        bracketSpacing: true,
        printWidth: 120,
        singleQuote: false,
        tabWidth: 4,
        useTabs: false,
      },
    },
  ],
};
