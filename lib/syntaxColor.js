var colors = require('ansicolors');

// Change the below definitions in order to tweak the color theme.
module.exports = {

    'Boolean': {
      'true'   :  undefined
    , 'false'  :  undefined
    , _default :  colors.red
    }

  , 'Identifier': {
      'undefined' :  colors.magenta
    , 'self'      :  colors.red
    , 'console'   :  colors.blue
    , 'log'       :  colors.blue
    , 'warn'      :  colors.red
    , 'error'     :  colors.red
    , _default    :  undefined
    }

  , 'Null': {
      _default: colors.magenta
    }

  , 'Numeric': {
      _default: colors.blue
    }

  , 'String': {
      _default: function (s, info) {
        var nextToken = info.tokens[info.tokenIndex + 1];

        // show keys of object literals and json in different color
        return (nextToken && nextToken.type === 'Punctuator' && nextToken.value === ':') 
          ? colors.blue(s)
          : colors.green(s);
      }
    }

  , 'Keyword': {
      'break'       :  undefined

    , 'case'        :  undefined
    , 'catch'       :  colors.cyan
    , 'class'       :  undefined
    , 'const'       :  undefined
    , 'continue'    :  undefined

    , 'debugger'    :  undefined
    , 'default'     :  undefined
    , 'delete'      :  colors.cyan
    , 'do'          :  undefined

    , 'else'        :  undefined
    , 'export'      :  undefined
    , 'extends'     :  undefined

    , 'finally'     :  colors.cyan
    , 'for'         :  undefined
    , 'function'    :  colors.magenta

    , 'if'          :  undefined
    , 'import'      :  undefined
    , 'in'          :  undefined
    , 'instanceof'  :  undefined
    , 'let'         :  undefined
    , 'new'         :  colors.magenta
    , 'return'      :  colors.magenta
    , 'static'      :  undefined
    , 'super'       :  undefined
    , 'switch'      :  undefined

    , 'this'        :  colors.blue
    , 'throw'       :  undefined
    , 'try'         :  colors.cyan
    , 'typeof'      :  undefined

    , 'var'         :  colors.green
    , 'void'        :  undefined

    , 'while'       :  undefined
    , 'with'        :  undefined
    , 'yield'       :  undefined
    , _default      :  undefined
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

    , '<': undefined
    , '>': undefined
    , '+': undefined
    , '-': undefined
    , '*': undefined
    , '%': undefined
    , '&': undefined
    , '|': undefined
    , '^': undefined
    , '!': undefined
    , '~': undefined
    , '?': undefined
    , ':': undefined
    , '=': colors.red

    , '<=': undefined
    , '>=': undefined
    , '==': undefined
    , '!=': undefined
    , '++': undefined
    , '--': undefined
    , '<<': undefined
    , '>>': undefined
    , '&&': undefined
    , '||': undefined
    , '+=': undefined
    , '-=': undefined
    , '*=': undefined
    , '%=': undefined
    , '&=': undefined
    , '|=': undefined
    , '^=': undefined
    , '/=': undefined
    , '=>': undefined

    , '===': undefined
    , '!==': undefined
    , '>>>': undefined
    , '<<=': undefined
    , '>>=': undefined
    , '...': undefined
    
    , '>>>=': undefined

    , _default: colors.red
  }

    // line comment
  , Line: {
     _default: colors.white
    }

    /* block comment */
  , Block: {
     _default: colors.white
    }

  , _default: colors.green
};
