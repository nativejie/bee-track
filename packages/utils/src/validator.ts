import { isObject, isString, isUndefined } from '.';

export const isExistProperty = (
  obj: Record<string, any>,
  key: string | number | symbol,
): boolean => obj.hasOwnProperty(key);

export const isNil = (obj: any): obj is null | undefined =>
  isUndefined(obj) || obj === null;

export const isEmpty = (str: any): boolean => {
  return (
    (isString(str) && str.trim() === '') || str === undefined || str === null
  );
};

export const isEmptyArray = (arry: Array<any>): boolean =>
  !(arry && arry.length > 0);

export const isEmptyObject = (obj: any) =>
  isObject(obj) && Object.keys(obj).length === 0;

export const isInstanceOf = (object: any, base: any): boolean => {
  try {
    return object instanceof base;
  } catch (error) {
    return false;
  }
};
