import { _global, isUndefined, isArray, isString } from '@bee/track-utils';
import { setup } from '@bee/track-core';
import { ITackOptions, ProxyType } from '@bee/track-shared';
import { TrackVue } from '@bee/track-vue';
import { consoleProxy, domEventProxy, httpProxy, routeProxy } from './proxy';

const init = (options: ITackOptions): void => {
  if (!('XMLHttpRequest' in _global) || options.disable === true) {
    return;
  }
  options = { ...options, maxRecords: 10 };
  setup(options);
  let { proxyEvent } = options;
  if (isUndefined(proxyEvent)) {
    proxyEvent = ['dom', 'http', 'console', 'route'];
  }
  setupProxy(proxyEvent);
};

const setupProxy = (proxyEvent: ProxyType[] | Lowercase<ProxyType>) => {
  if (!isArray(proxyEvent)) {
    return;
  }
  if (proxyEvent.includes('dom')) {
    domEventProxy();
  }
  if (proxyEvent.includes('console')) {
    consoleProxy();
  }
  if (proxyEvent.includes('http')) {
    httpProxy();
  }
  if (proxyEvent.includes('route')) {
    routeProxy();
  }
};

export { init, TrackVue };
