/**
 * @jest-environment jsdom
 */
import { isWindow } from '@bee/track-utils';
describe('type.ts', () => {
  it('isWindow', () => {
    expect(isWindow(window)).toBeTruthy();
  });
});
