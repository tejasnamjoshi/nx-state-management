module.exports = {
    // Global settings that apply to any file type
    useTabs: false,
    tabWidth: 2,
    printWidth: 150,
    endOfLine: 'auto',
    trailingComma: 'none',
    arrowParens: 'avoid',
  
    // Settings for specific file types
    // Note: File string does not support regular expressions (ex: '*.tsx?')
    // so we must define each file type manually
    overrides: [
      {
        files: '*.js',
        options: {
          singleQuote: true
        }
      },
      {
        files: '*.tsx',
        options: {
          singleQuote: true,
          parser: 'typescript'
        }
      },
      {
        files: '*.ts',
        options: {
          singleQuote: true,
          parser: 'typescript'
        }
      }
    ]
  };
  