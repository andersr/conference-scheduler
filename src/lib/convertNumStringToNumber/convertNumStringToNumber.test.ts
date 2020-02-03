import { convertNumStringToNumber } from './convertNumStringToNumber';

describe('convertNumStringToNumber', () => {

   it('converts a string that includes numbers to a numeral', () => {
      expect(convertNumStringToNumber('60min')).toStrictEqual(60);
   });

   it('returns null if no numbers are found', () => {
      expect(convertNumStringToNumber('bla')).toBeNull();
   });

});