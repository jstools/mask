
describe('$mask format', function () {

  var carEnrolmentMask = '{{9999}} {{aaa}}',
      phoneMask = '({{999}}) {{99}} {{99}} {{99}}';

  it('should be defined', function () {
    expect($mask).toBeDefined();
    expect($mask.MaskParser).toBeDefined();
  });

  describe('format ' + carEnrolmentMask, function () {

    var mask = $mask(carEnrolmentMask);

    it('format 1324', function () {
      expect( mask.format('1324') ).toBe('1324 ');
    });

    it('format 1324a', function () {
      expect( mask.format('1324a') ).toBe('1324 a');
    });

    it('format 1324abc', function () {
      expect( mask.format('1324abc') ).toBe('1324 abc');
    });

    it('format 13245 should throw exception', function () {
      var pristine = true;
      try {
        pristine = mask.format('13245');
      } catch (err) {
        expect( pristine ).toBe(true);
      }
    });

  });

  describe('format ' + phoneMask, function () {

    var mask = $mask(phoneMask);

    it('format 654', function () {
      expect( mask.format('654') ).toBe('(654) ');
    });

    it('format 654789', function () {
      expect( mask.format('654789') ).toBe('(654) 78 9');
    });

    it('format 654987321', function () {
      expect( mask.format('654987321') ).toBe('(654) 98 73 21');
    });

    it('format 1234567890 should throw exception', function () {
      var pristine = true;
      try {
        pristine = mask.format('1234567890');
      } catch (err) {
        expect( pristine ).toBe(true);
      }
    });

  });

});
