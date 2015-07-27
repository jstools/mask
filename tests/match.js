
describe('$mask match', function () {

  var carEnrolmentMask = '{{9999}} {{aaa}}',
      phoneMask = '({{999}}) {{99}} {{99}} {{99}}';

  it('should be defined', function () {
    expect($mask).toBeDefined();
    expect($mask.MaskParser).toBeDefined();
  });

  describe('match ' + carEnrolmentMask, function () {

    var mask = $mask(carEnrolmentMask);

    it('match mask', function () {
      expect( mask.mask ).toBe(carEnrolmentMask);
    });

    it('match regexp', function () {
      expect( mask.reMatch.toString() ).toBe('/^(\\d)(\\d)?(\\d)?(\\d)?([a-z])?([a-z])?([a-z])?$/');
    });

    it('match 1324abc should succeed', function () {
      expect( mask.match('1324abc') ).not.toBe(null);
    });

    it('match 13245 should fail', function () {
      expect( mask.match('13245') ).toBe(null);
    });

  });

  describe('match ' + phoneMask, function () {

    var mask = $mask(phoneMask);

    it('match mask', function () {
      expect( mask.mask ).toBe(phoneMask);
    });

    it('match regexp', function () {
      expect( mask.reMatch.toString() ).toBe('/^(\\d)(\\d)?(\\d)?(\\d)?(\\d)?(\\d)?(\\d)?(\\d)?(\\d)?$/');
    });

    it('match 123 should succeed', function () {
      expect( mask.match('123') ).not.toBe(null);
    });

    it('match 123456 should succeed', function () {
      expect( mask.match('123456') ).not.toBe(null);
    });

    it('match 123456789 should succeed', function () {
      expect( mask.match('123456789') ).not.toBe(null);
    });

    it('match 1234567890 should fail', function () {
      expect( mask.match('1234567890') ).toBe(null);
    });

    it('match alphavalue should fail', function () {
      expect( mask.match('alphavalue') ).toBe(null);
    });

  });

});
