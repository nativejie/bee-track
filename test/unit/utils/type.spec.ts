/**
 * @jest-environment jsdom
 */
import {
  isUndefined,
  isObject,
  isFunction,
  isString,
  isSymbol,
  isArray,
  isProcess,
} from '@bee/track-utils';

describe('type.ts', () => {
  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  it('isObject', () => {
    const foo = 'foo';
    expect(isObject({})).toBeTruthy();
    expect(isObject([])).toBeTruthy();
    expect(isObject('')).toBeFalsy();
    expect(isObject(foo)).toBeFalsy();
  });

  it('isFunction', () => {
    const foo = () => {
      console.log('foo');
    };
    const bar = 'bar';
    expect(isFunction(foo)).toBeTruthy();
    expect(isFunction(bar)).toBeFalsy();
  });

  it('isString', () => {
    const foo = 'foo';
    const bar = 1;
    expect(isString(foo)).toBeTruthy();
    expect(isString(bar)).toBeFalsy();
  });

  it('isSymbol', () => {
    const foo = Symbol('foo');
    const bar = 'bar';
    expect(isSymbol(foo)).toBeTruthy();
    expect(isSymbol(bar)).toBeFalsy();
  });

  it('isArray', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray({})).toBeFalsy();
  });

  it('isProcess', () => {
    expect(isProcess(process)).toBeTruthy();
  });
});
