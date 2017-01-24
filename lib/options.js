module.exports = {
  collapseNewlines: {
    description: 'Reduce new lines to never have more than one empty line.',
    default: true
  },
  space: {
    description: 'Replace space characters.',
    default: ''
  },
  hrStart: {
    description: 'Start of an horizontal line.',
    default: ''
  },
  hrChar: {
    description: 'Character to be repeated for the horizontal line.',
    default: '-'
  },
  hrEnd: {
    description: 'Character at the end of the horizontal line.', 
    default: ''
  },
  headingStart: {
    description: 'Character at the start of a header.',
    default: '\n'
  },
  headingEnd: {
    description: 'Character at the end of a header.',
    default: '\n\n'
  },
  headingIndentChar: {
    description: 'Character repeated for the depth of the indentation.',
    default: '#'
  },
  codeStart: {
    description: 'Start of a code block.',
    default: '\n'
  },
  codeEnd: {
    description: 'End of a code block.',
    default: '\n\n'
  },
  codePad: {
    padding: true,
    description: 'Padding for code blocks.',
    default: '    '
  },
  blockquoteStart: {
    description: 'Start of a quote blocks.',
    default: '\n'
  },
  blockquoteEnd:  {
    description: 'End of a quote block.',
    default: '\n\n',
  },
  blockquoteColor: {
    description: 'Color of a blockQuote',
    default: 'blockquote'
  },
  blockquotePad: {
    padding: true,
    description: 'Padding for blockquote blocks.',
    default: '  > '
  },
  blockquotePadColor: {
    description: 'Color for the padding of a block.',
    default: 'syntax'
  },
  listStart: {
    description: 'Start of list block.',
    default: '\n'
  },
  listEnd: {
    description: 'End of list block.',
    default: '\n'
  },
  listItemStart: {
    description: 'Start of list-item block.',
    default: ''
  },
  listItemEnd: {
    description: 'End of list-item block.',
    default: '\n'
  },
  listItemColor: {
    description: 'Color of list items',
    default: 'ul'
  },
  listItemPad: {
    padding: true,
    description: 'Padding for list items. ',
    default: {first: '  * ', regular: '    '}
  },
  listItemPadColor: {
    description: 'Color of list-item padding.',
    default: 'syntax'
  },
  paragraphStart: {
    description: 'Start of paragraph.',
    default: ''
  },
  paragraphEnd: {
    description: 'End of paragraph',
    default: '\n\n'
  },
  width: {
    description: 'Width of the output block. Falls back to terminal width if possible.',
    default: process.stdout.columns || 80,
  },
  tableStart: {
    description: 'Start of a table block.',
    default: '\n',
  },
  tableSeparator: {
    description: 'Separator between columns.',
    default: ' ',
  },
  tableEnd: {
    description: 'End of a table block.',
    default: '\n\n'
  }
}

Object.keys(module.exports).forEach(function (option) {
  module.exports[option].cli = option.replace(/[A-Z]/g, function (found) {
    return '-' + found.toLowerCase()
  })
})
