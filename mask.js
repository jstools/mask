(function (root, factory) {
  'use strict';

  if ( typeof module !== 'undefined' ) {
    module.exports = factory(root);
  } else {
    if ( root.define ) {
      root.define('$mask',factory);
    } else if ( root.angular ) {
        root.angular.module('jstools.mask', []).constant('$mask', factory() );
    } else if( !root.$storage ) {
      root.$mask = factory();
    }
  }

})(this, function (root) {
  'use strict';

  function _zipArray (a1, a2) {
    var list = [],
        maxLen = a1.length > a2.length ? a1.length : a2.length;

    for( var i = 0; i < maxLen ; i++ ) {
      if( i < a1.length ) {
        if( a1[i] instanceof Array ) {
          list = list.concat(a1[i]);
        } else {
          list.push(a1[i]);
        }
      }
      if( i < a2.length ) {
        if( a2[i] instanceof Array ) {
          list = list.concat(a2[i]);
        } else {
          list.push(a2[i]);
        }
      }
    }

    return list;
  }

  var RE_LETTER = {
    '9': '\\d',
    'a': '[a-z]',
    'A': '[A-Z]',
    'â': '[a-zA-Z]'
  };

  function getMatchSymbol (symbol) {
    return '(' + RE_LETTER[symbol] + ')';
  }

  function optional (mapper) {
    return function (symbol) {
      return mapper(symbol) + '?';
    };
  }

  function reduceMatch (prev, symbol) {
    return prev + getMatchSymbol(symbol) + ( prev ? '?' : '' );
  }

  function reduceTest (prev, letter) {
    return prev + RE_LETTER[letter];
  }

  function getNull () {
    return null;
  }

  function mapNull (str) {
    return str.split('').map(getNull);
  }

  function mapMatch (str) {
    return str.split('').map(getMatchSymbol);
  }

  var escapeChars = ['(', ')', '[', ']', '{', '}', ];
  escapeChars.map = {};
  escapeChars.forEach(function (char) { escapeChars.map[char] = true; });

  function mapEscapeChar (char) {
    return char === ' ' ? '\\s' : ( escapeChars.map[char] ? ('\\' + char) : char );
  }

  function mapEscape (partial) {
    return partial.split('').map(mapEscapeChar);
  }

  function reduceMatrioska (prev, value) {
    return value + ( prev ? ('(' + prev + ')?') : '' );
  }

  function reducePartial (prev, value, index, list) {

    if( value === undefined || value.length > 1 || !list[index + 1] ) {
      return prev;
    }

    return prev + value;
  }

  function MaskParser (mask) {

    var plain = mask.split(/\{[^\}]+\}/),
        wilds = mask.match(/\{([^\}]+)\}/g);

    if( wilds ) {
      wilds = wilds.map(function (value) {
        return value.substr(1, value.length - 2);
      });

      this.reMatch = new RegExp('^' + wilds.join('').split('').reduce(reduceMatch, '') + '$');
      this.reValid = new RegExp('^' + wilds.join('').split('').reduce(reduceTest, '') + '$');
      this.reParse = new RegExp('^' + _zipArray( plain.map(mapEscape), wilds.map(mapMatch) ).join('') + '$');
      this.reParsePartial = new RegExp('^' + _zipArray( plain.map(mapEscape), wilds.map(mapMatch) ).reduceRight(reduceMatrioska, '') + '$');

      this.maskArray = _zipArray(plain, wilds.map(mapNull) );

    } else {
      throw new Error('wrong mask');
    }
  }

  MaskParser.prototype.format = function (value) {
    var matches = this.match(value);
    if( !matches ) {
      throw new Error('value mismatch');
    }

    var mask = '', valueIndex = 0;

    for( var i = 0, len = this.maskArray.length ; i < len ; i++ ) {
      if( this.maskArray[i] === null ) {
        if( !value.charAt(valueIndex) ) {
          return mask;
        }
        mask += value.charAt(valueIndex++);
      } else {
        mask += this.maskArray[i];
      }
    }
    return mask;
  };

  MaskParser.prototype.match = function (value) {
    var matches = value.match(this.reMatch);
    return matches && matches.slice(1);
  };

  MaskParser.prototype.valid = function (value) {
    return this.reValid.test(value);
  };

  MaskParser.prototype.parseFull = function (value) {
    var matches = value.match(this.reParse);
    if( !matches ) {
      throw new Error('value mismatch');
    }
    return matches.slice(1).join('');
  };

  MaskParser.prototype.parse = function (value) {
    var matches = value.match(this.reParsePartial);
    if( !matches ) {
      throw new Error('value mismatch');
    }
    return matches.reduce(reducePartial, '');
  };

  function $mask (mask) {
    return new MaskParser(mask);
  }

  $mask.MaskParser = MaskParser;

  return $mask;

});
