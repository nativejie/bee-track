import { AES, getRandom, getRandomBasic, getTrackId } from '@bee/track-utils';

describe('validator.ts', () => {
  it('AES Test', () => {
    expect(AES(`{ user: 'zhoujie', phone: 18715012580 }`)).toBeDefined();
  });

  it('getRandomBasic Test', () => {
    expect(getRandomBasic()).toBeDefined;
  });

  it('getRandom Test', () => {
    expect(getRandom()).toBeDefined();
  });

  it('getTrackId Test', () => {
    expect(getTrackId()).toBeDefined();
  });
});
