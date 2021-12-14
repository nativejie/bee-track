import { isBrowserEnv, isUndefined, isWxEnv, _global } from '.';
import CryptoJS from 'crypto-js';
import { v1 as uuidv1 } from 'uuid';
import { SECRET } from '@bee/track-shared';

export const proxyHelper = (
  target: Record<string, any>,
  propertyKey: string,
  replacement: (...args: any[]) => any,
) => {
  if (!(propertyKey in target) || isUndefined(target)) {
    return;
  }
  const original = target[propertyKey];
  target[propertyKey] = function (...args) {
    replacement.apply(this, args);
    original.apply(this, args);
  };
};

export const getLocationHref = (): string => {
  if (
    !('document' in _global) ||
    document.location == null ||
    typeof document === 'undefined'
  ) {
    return '';
  }
  return document.location.href;
};

export const getWindowScreen = () => {
  if (isBrowserEnv) {
    const { width, height } = _global.screen;
    return { screenWidth: width, screenHeight: height };
  }
  if (isWxEnv) {
    const { windowHeight, windowWidth } = wx.getSystemInfoSync();
    return { screenWidth: windowWidth, screenHeight: windowHeight };
  }
  return {};
};

export const AES = (str: string): string => {
  return CryptoJS.AES.encrypt(str, SECRET).toString();
};

export const uuid = (): string => {
  return uuidv1();
};

export const getTrackId = () => {
  return Number(
    String(getRandom()).slice(2, 5) +
      String(getRandom()).slice(2, 4) +
      String(new Date().getTime()).slice(-4),
  );
};

export const getRandom = () => {
  if (typeof Uint32Array === 'function' && typeof crypto !== 'undefined') {
    const random = new Uint32Array(1);
    return crypto.getRandomValues(random)[0] / Math.pow(2, 32);
  }
  return getRandomBasic();
};

export const getRandomBasic = (function () {
  //  关于为什么取9301, 49297, 233280这几个数字 可以参考：https://www.zhihu.com/question/22818104/answer/22744803
  let seed = Date.now();
  return function () {
    return (seed = (9301 * seed + 49297) % 233280) / 233280;
  };
})();

export const getStringSize = (str: string) => {
  const blob = new Blob([str]);
  return blob.size / 1024;
};

export const throttle = (
  fn: (args: any[]) => any,
  wait: number,
): ((args: any[]) => void) => {
  let time = Date.now();
  return function (...args: any[]) {
    const now = Date.now();
    if (now - time > wait) {
      fn.apply(this, args);
      time = now;
    }
  };
};
