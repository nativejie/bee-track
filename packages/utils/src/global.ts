import { isProcess, isUndefined, isFunction, isWindow, isObject } from '.';

export const isNodeEnv = isProcess(isUndefined(process) ? 0 : process);

export const isWxEnv =
  isObject(isUndefined(wx) ? 0 : wx) && isFunction(isUndefined(App) ? 0 : wx);

export const isBrowserEnv = isWindow(isUndefined(window) ? 0 : window);

export const getGlobal = <T>() => {
  if (isBrowserEnv) {
    return window as unknown as T;
  }
  if (isWxEnv) {
    return wx as unknown as T;
  }
  if (isNodeEnv) {
    return process as unknown as T;
  }
};

const _global = getGlobal<Window>();

export const supportsHistory = (): boolean => {
  // https://github.com/angular/angular.js/pull/13945/files
  const chrome = (_global as any).chrome;
  const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;

  const hasHistoryApi =
    'history' in _global &&
    !!_global.history.pushState &&
    !!_global.history.replaceState;
  return !isChromePackagedApp && hasHistoryApi;
};

export { _global };
