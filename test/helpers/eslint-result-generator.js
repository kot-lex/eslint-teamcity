exports.createDummyError = () => ({
  messages: [
    {
      severity: 2, // error
      line: 1,
      column: 1,
      message: "'\n\r\u0085\u2028\u2029|[]"
    },
    {
      severity: 2, // error
      line: 2,
      column: 1,
      message: 'This is a test error.',
      ruleId: 'no-unreachable'
    }
  ],
  filePath: 'testfile.js'
});

exports.createFatalError = () => ({
  messages: [
    {
      fatal: true, // usually omitted, but will be set to true if there's a parsing error
      line: 1,
      column: 1,
      message: 'Some fatal error'
    }
  ],
  filePath: 'testfile-fatal.js'
});

exports.createDummyWarning = () => ({
  messages: [
    {
      severity: 1, // warning
      line: 1,
      column: 1,
      message: 'Some warning'
    },
    {
      severity: 1, // warning
      line: 2,
      column: 2,
      message: 'This is a test warning.'
    }
  ],
  filePath: 'testfile-warning.js'
});
