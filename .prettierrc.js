module.exports = {
  bracketSpacing: true,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.sol',
      options: {
        bracketSpacing: true,
        printWidth: 160,
        singleQuote: false,
        tabWidth: 4,
        useTabs: false,
      },
    },
  ],
};
