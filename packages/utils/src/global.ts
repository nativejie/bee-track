import { isProcess, isFunction, isWindow, isObject, Logger } from '.';
import { ITackOptions } from '@bee/track-shared';
import { Report, Record } from '@bee/track-core';

export const isNodeEnv = isProcess(
  typeof process !== 'undefined' ? process : 0,
);

export const isWxEnv =
  isObject(typeof wx !== 'undefined' ? wx : 0) &&
  isFunction(typeof App !== 'undefined' ? App : 0);

export const isBrowserEnv = isWindow(
  typeof window !== 'undefined' ? window : 0,
);

export const getGlobal = <T>() => {
  if (isBrowserEnv) {
    return window as unknown as TrackGlobal & T;
  }
  if (isWxEnv) {
    return wx as unknown as TrackGlobal & T;
  }
  if (isNodeEnv) {
    return process as unknown as TrackGlobal & T;
  }
};

type Router = {
  from?: string;
  to?: string;
  title?: string;
};
export interface TrackProperties {
  logger: Logger;
  options: ITackOptions;
  report: Report;
  route?: Router;
  records: Record;
}

interface TrackGlobal {
  console?: Console;
  __TRACK__?: TrackProperties;
}

const _global = getGlobal<Window>();
const _extra = (_global.__TRACK__ =
  _global.__TRACK__ || ({} as TrackProperties));

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

export { _global, _extra };
