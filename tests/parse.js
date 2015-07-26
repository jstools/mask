
describe('$mask parse', function () {

  var carEnrolmentMask = '{9999} {aaa}',
      phoneMask = '({999}) {99} {99} {99}',
      phoneMaskES = '(+34) {999} {99} {99} {99}',
      pristine = {};

  describe('parse ' + carEnrolmentMask, function () {

    var mask = $mask(carEnrolmentMask);

    it('parse regexp', function () {
      expect( mask.reParse.toString() ).toBe('/^(\\d)(\\d)(\\d)(\\d)\\s([a-z])([a-z])([a-z])$/');
    });

    it('parse regexp partial', function () {
      expect( mask.reParsePartial.toString() ).toBe('/^(\\d)((\\d)((\\d)((\\d)(\\s(([a-z])(([a-z])(([a-z]))?)?)?)?)?)?)?$/');
    });

    it('parse 1234 abc', function () {
      expect( mask.parse('1234') ).toBe('1234');
    });

    it('parse 123', function () {
      expect( mask.parse('123') ).toBe('123');
    });

    it('parse 1234 a', function () {
      expect( mask.parse('1234 a') ).toBe('1234a');
    });

    it('parse 1234 abc', function () {
      expect( mask.parseFull('1234 abc') ).toBe('1234abc');
    });

    it('parse 123 abc', function () {
      var value = pristine;
      try {
        value = mask.parseFull('123 abc');
      } catch(err) {}

      expect( value ).toBe( pristine );
    });

  });

  describe('parse ' + phoneMask, function () {

    var mask = $mask(phoneMask);

    it('parse regexp', function () {
      expect( mask.reParse.toString() ).toBe('/^\\((\\d)(\\d)(\\d)\\)\\s(\\d)(\\d)\\s(\\d)(\\d)\\s(\\d)(\\d)$/');
    });

    it('parse (654)', function () {
      expect( mask.parse('(654)') ).toBe('654');
    });

    it('parse (654) 98', function () {
      expect( mask.parse('(654) 98') ).toBe('65498');
    });

    it('parse (654) 98 73 21', function () {
      expect( mask.parseFull('(654) 98 73 21') ).toBe('654987321');
    });

    it('parse 654987321', function () {
      var value = pristine;
      try {
        value = mask.parseFull('654987321');
      } catch(err) {}

      expect( value ).toBe( pristine );
    });

  });

  describe('parse ' + phoneMaskES, function () {

    var mask = $mask(phoneMaskES);

    it('parse regexp', function () {
      expect( mask.reParse.toString() ).toBe('/^\\(\\+34\\)\\s(\\d)(\\d)(\\d)\\s(\\d)(\\d)\\s(\\d)(\\d)\\s(\\d)(\\d)$/');
    });

    it('parse regexp partial', function () {
      expect( mask.reParsePartial.toString() ).toBe('/^\\((\\+(3(4(\\)(\\s((\\d)((\\d)((\\d)(\\s((\\d)((\\d)(\\s((\\d)((\\d)(\\s((\\d)((\\d))?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?$/');
    });

    it('parse (+34)', function () {
      expect( mask.parse('(+34)') ).toBe('');
    });

    it('parse (+34) 654', function () {
      expect( mask.parse('(+34) 654') ).toBe('654');
    });

    it('parse (+34) 654 98 7', function () {
      expect( mask.parse('(+34) 654 98 7') ).toBe('654987');
    });

    it('parse (+34) 654 98 73 21', function () {
      expect( mask.parse('(+34) 654 98 73 21') ).toBe('654987321');
    });

  });

});
