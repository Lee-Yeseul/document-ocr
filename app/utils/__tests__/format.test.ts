import { extractFields } from '../format';

describe('extractFields', () => {
  it('should parse reference number, weight and date', () => {
    const text = `Reference No. ABC123\nSome other line\nGW: 12.5 KGM\nCertification: Something FEBRUARY 9, 2024 more text`;
    expect(extractFields(text)).toEqual({
      referenceNo: 'ABC123',
      weight: '12.5 KGM',
      date: '202429',
    });
  });
});
