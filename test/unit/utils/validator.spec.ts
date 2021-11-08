import {
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isExistProperty,
  isInstanceOf,
  isNil,
} from '@bee/track-utils';

describe('validator.ts', () => {
  it('isEmpty', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty(0)).toBeFalsy();
    expect(isEmpty({ test: 1 })).toBeFalsy();
  });

  it('isEmptyObject', () => {
    expect(isEmptyObject({})).toBeTruthy();
    expect(isEmptyObject([])).toBeTruthy();
    expect(isEmptyObject({ a: 1 })).toBeFalsy();
  });

  it('isEmptyArray', () => {
    expect(isEmptyArray([])).toBeTruthy();
    expect(isEmptyArray([1])).toBeFalsy();
  });

  it('isExistProperty', () => {
    const obj = { a: 1 };
    expect(isExistProperty(obj, 'a')).toBeTruthy();
    expect(isExistProperty(obj, 'b')).toBeFalsy();
  });

  it('isNil', () => {
    expect(isNil(null)).toBeTruthy();
    expect(isNil(undefined)).toBeTruthy();
    expect(isNil('')).toBeFalsy();
  });

  it('isInstanceOf', () => {
    const foo = function () {
      console.log('foo');
    };
    const bar = function () {
      console.log('bar');
    };
    const _foo = new foo();
    expect(isInstanceOf(_foo, foo)).toBeTruthy();
    expect(isInstanceOf(_foo, bar)).toBeFalsy();
    expect(isInstanceOf(_foo, 'bar')).toBeFalsy();
  });
});
