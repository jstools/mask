
describe('$mask valid', function () {

  var carEnrolmentMask = '{9999} {aaa}',
      phoneMask = '({999}) {99} {99} {99}';

  describe('valid ' + carEnrolmentMask, function () {

    var mask = $mask(carEnrolmentMask);

    it('valid regexp', function () {
      expect( mask.reValid.toString() ).toBe('/^\\d\\d\\d\\d[a-z][a-z][a-z]$/');
    });

    it('1324abc should be valid', function () {
      expect( mask.valid('1324abc') ).toBe(true);
    });

    it('13245 should not be valid', function () {
      expect( mask.valid('13245') ).toBe(false);
    });

  });

  describe('valid ' + phoneMask, function () {

    var mask = $mask(phoneMask);

    it('valid regexp', function () {
      expect( mask.reValid.toString() ).toBe('/^\\d\\d\\d\\d\\d\\d\\d\\d\\d$/');
    });

    it('123456789 should be valid', function () {
      expect( mask.valid('123456789') ).toBe(true);
    });

    it('123 should not be valid', function () {
      expect( mask.valid('123') ).toBe(false);
    });

    it('123456 should not be valid', function () {
      expect( mask.valid('123456') ).toBe(false);
    });

    it('1234567890 should not be valid', function () {
      expect( mask.valid('1234567890') ).toBe(false);
    });

    it('alphavalue should not be valid', function () {
      expect( mask.valid('alphavalue') ).toBe(false);
    });

  });

});
