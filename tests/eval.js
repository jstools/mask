
describe('$mask eval', function () {

  var carEnrolmentMask = '{9999} {aaa}',
      phoneMask = '({999}) {99} {99} {99}';

  it('should be defined', function () {
    expect($mask).toBeDefined();
    expect($mask.MaskParser).toBeDefined();
  });

  describe('eval ' + carEnrolmentMask, function () {

    var mask = $mask(carEnrolmentMask);

    it('eval 1324', function () {
      expect( mask.eval('1324') ).toBe('1324 ');
    });

    it('eval 1324a', function () {
      expect( mask.eval('1324a') ).toBe('1324 a');
    });

    it('eval 1324abc', function () {
      expect( mask.eval('1324abc') ).toBe('1324 abc');
    });

    it('eval 13245 should throw exception', function () {
      var pristine = true;
      try {
        pristine = mask.eval('13245');
      } catch (err) {
        expect( pristine ).toBe(true);
      }
    });

  });

  describe('eval ' + phoneMask, function () {

    var mask = $mask(phoneMask);

    it('eval 654', function () {
      expect( mask.eval('654') ).toBe('(654) ');
    });

    it('eval 654789', function () {
      expect( mask.eval('654789') ).toBe('(654) 78 9');
    });

    it('eval 654987321', function () {
      expect( mask.eval('654987321') ).toBe('(654) 98 73 21');
    });

    it('eval 1234567890 should throw exception', function () {
      var pristine = true;
      try {
        pristine = mask.eval('1234567890');
      } catch (err) {
        expect( pristine ).toBe(true);
      }
    });

  });

});
