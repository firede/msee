var colors = require('ansicolors');

// Change the below definitions in order to tweak the color theme.
module.exports = {

    'Boolean': {
      'true'   :  undefined
    , 'false'  :  undefined
    , _default :  colors.brightYellow
    }

  , 'Identifier': {
      'undefined' :  colors.brightMagenta
    , 'self'      :  colors.brightRed
    , 'console'   :  undefined
    , 'log'       :  colors.brightYellow
    , 'warn'      :  colors.brightYellow
    , 'error'     :  colors.brightYellow
    , _default    :  undefined
    }

  , 'Null': {
      _default: colors.brightMagenta
    }

  , 'Numeric': {
      _default: colors.brightBlue
    }

  , 'String': {
      _default: function (s, info) {
        var nextToken = info.tokens[info.tokenIndex + 1];

        // show keys of object literals and json in different color
        return (nextToken && nextToken.type === 'Punctuator' && nextToken.value === ':') 
          ? colors.brightBlue(s)
          : colors.brightGreen(s);
      }
    }

  , 'Keyword': {
      'break'       :  undefined

    , 'case'        :  undefined
    , 'catch'       :  undefined
    , 'class'       :  undefined
    , 'const'       :  undefined
    , 'continue'    :  undefined

    , 'debugger'    :  undefined
    , 'default'     :  undefined
    , 'delete'      :  undefined
    , 'do'          :  undefined

    , 'else'        :  undefined
    , 'export'      :  undefined
    , 'extends'     :  undefined

    , 'finally'     :  undefined
    , 'for'         :  undefined
    , 'function'    :  colors.brightMagenta

    , 'if'          :  undefined
    , 'import'      :  undefined
    , 'in'          :  undefined
    , 'instanceof'  :  colors.brightMagenta
    , 'let'         :  undefined
    , 'new'         :  colors.brightRed
    , 'return'      :  colors.brigntMagenta
    , 'static'      :  undefined
    , 'super'       :  undefined
    , 'switch'      :  undefined

    , 'this'        :  undefined
    , 'throw'       :  undefined
    , 'try'         :  undefined
    , 'typeof'      :  undefined

    , 'var'         :  colors.brightCyan
    , 'void'        :  undefined

    , 'while'       :  undefined
    , 'with'        :  undefined
    , 'yield'       :  undefined
    , _default      :  colors.brightCyan
  }
  , 'Punctuator': {
      ';': undefined
    , '.': undefined  
    , ',': undefined 

    , '{': undefined
    , '}': undefined
    , '(': undefined  
    , ')': undefined 
    , '[': undefined
    , ']': undefined

    , '<': colors.brightMagenta
    , '>': colors.brightMagenta
    , '+': colors.brightMagenta
    , '-': colors.brightMagenta
    , '*': colors.brightMagenta
    , '%': colors.brightMagenta
    , '&': colors.brightMagenta
    , '|': colors.brightMagenta
    , '^': colors.brightMagenta
    , '!': colors.brightMagenta
    , '~': colors.brightMagenta
    , '?': colors.brightMagenta
    , ':': undefined
    , '=': colors.brightMagenta

    , '<=': colors.brighYellow
    , '>=': colors.brighYellow
    , '==': colors.brighYellow
    , '!=': colors.brighYellow
    , '++': colors.brighYellow
    , '--': colors.brighYellow
    , '<<': colors.brighYellow
    , '>>': colors.brighYellow
    , '&&': colors.brighYellow
    , '||': colors.brighYellow
    , '+=': colors.brighYellow
    , '-=': colors.brighYellow
    , '*=': colors.brighYellow
    , '%=': colors.brighYellow
    , '&=': colors.brighYellow
    , '|=': colors.brighYellow
    , '^=': colors.brighYellow
    , '/=': colors.brighYellow
    , '=>': colors.brighYellow

    , '===': colors.brightCyan
    , '!==': colors.brightCyan
    , '>>>': colors.brightCyan
    , '<<=': colors.brightCyan
    , '>>=': colors.brightCyan
    , '...': colors.brightCyan
    
    , '>>>=': colors.cyan

    , _default: undefined
  }

    // line comment
  , Line: {
     _default: colors.white
    }

    /* block comment */
  , Block: {
     _default: colors.white
    }

  , _default: undefined
};
