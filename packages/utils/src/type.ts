const nativeToString = Object.prototype.toString;

export const isUndefined = (obj: any): obj is undefined => {
  return typeof obj === 'undefined';
};

export const isObject = (obj: any): boolean => {
  return typeof obj === 'object';
};

export const isFunction = (fn: any): boolean => typeof fn === 'function';

export const isString = (str: any): str is string => typeof str === 'string';

export const isSymbol = (fn: any): fn is symbol => typeof fn === 'symbol';

export const isWindow = (fn: any): fn is Window =>
  nativeToString.call(fn) === '[object Window]';

export const isProcess = (fn: any): boolean =>
  nativeToString.call(fn) === '[object process]';

export const isArray = (obj: any): obj is Array<any> =>
  Array.isArray(obj) && nativeToString.call(obj) === '[object Array]';
