import {
  isObject,
  _global,
  _extra,
  logger,
  supportsHistory,
  getLocationHref,
  proxyHelper,
  isNil,
  getEventElementPath,
  getElementInfoByEvent,
} from '@bee/track-utils';
import {
  RequestMethod,
  TrackEventType,
  HttpType,
  IHttpTack,
  IDomEventTrack,
  IConsoleEventTrack,
} from '@bee/track-shared';
import { report, TrackEvent } from '@bee/track-core';
import json5 from 'json5';

const XHRProxy = () => {
  if (!('XMLHttpRequest' in _global)) {
    return;
  }
  let xhrTrackData: IHttpTack = {} as IHttpTack;
  proxyHelper(XMLHttpRequest.prototype, 'open', function (...args: any[]) {
    xhrTrackData = {
      method: args[0],
      url: args[1],
      startTime: Date.now(),
      type: HttpType.XHR,
    };
    logger.log('XHR Opened: ', xhrTrackData);
  });

  proxyHelper(XMLHttpRequest.prototype, 'open', function (...args: any[]) {
    this.onloadend = function () {
      const { method, url } = xhrTrackData;
      if (method === RequestMethod.POST && report.isReportUrl(url)) {
        return;
      }
      xhrTrackData.params = args[0];
      const { responseType, response, status } = this;
      xhrTrackData.endTime = Date.now();
      xhrTrackData.status = status;
      if (['', 'json', 'text'].indexOf(responseType) !== -1) {
        xhrTrackData.responseText = isObject(response)
          ? JSON.stringify(response)
          : response;
      }
      xhrTrackData.time = xhrTrackData.endTime - xhrTrackData.startTime;
      TrackEvent.emit(TrackEventType.HTTP, xhrTrackData);
    };
  });
};

const fetchProxy = () => {
  if (!('fetch' in _global)) {
    return;
  }
  let fetchTrackData: IHttpTack = {} as IHttpTack;
  const orignFetch = _global.fetch;
  _global.fetch = function (
    url: string,
    config: Partial<Request> = {},
  ): Promise<Response> {
    const method = (config && config.method) || 'GET';
    const startTime = Date.now();
    fetchTrackData = {
      method,
      url,
      startTime,
      type: HttpType.FETCH,
      params: config && config.body,
    };
    return orignFetch
      .apply(_global, [url, config])
      .then((res: Response) => {
        const tempRes = res.clone();
        const endTime = Date.now();
        fetchTrackData = {
          ...fetchTrackData,
          endTime,
          time: endTime - startTime,
          status: tempRes.status,
        };
        tempRes.text().then((data) => {
          if (method === RequestMethod.POST && report.isReportUrl(url)) {
            return;
          }
          fetchTrackData.responseText = data;
          TrackEvent.emit(TrackEventType.HTTP, fetchTrackData);
        });
        return res;
      })
      .catch((err: Error) => {
        throw err;
      });
  };
};

let lastHref: string = getLocationHref();
export const historyProxy = () => {
  if (!supportsHistory()) {
    return;
  }
  /**
   * 调用history.pushState()或者history.replaceState()不会触发popstate事件.
   * popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法)
   */
  const oldOpopstate = _global.onpopstate;

  _global.onpopstate = function (...args: any[]): any {
    const to = getLocationHref();
    const from = lastHref;
    lastHref = to;
    TrackEvent.emit(TrackEventType.ROUTE, { from, to });
    _extra.route = {
      from,
      to,
    };
    oldOpopstate && oldOpopstate.apply(this, args);
  };

  const historyProxyFn = function (...args: any[]): void {
    const url = args.length > 2 ? args[2] : '';
    if (url) {
      const from = lastHref;
      const to = url;
      lastHref = to;
      _extra.route = {
        from,
        to,
      };
      TrackEvent.emit(TrackEventType.ROUTE, { from, to });
    }
    return;
  };
  proxyHelper(_global.history, 'pushState', historyProxyFn);
  proxyHelper(_global.history, 'replaceState', historyProxyFn);
};

// 理论和onpopstate效果一样， onpopstate支持history和hash，此API支持hash前进后退，兼容性相对onpopstate较好
export const listenHashChange = (): void => {
  if (!_global.hasOwnProperty('onpopstate')) {
    _global.addEventListener('hashchange', function (event: HashChangeEvent) {
      const { newURL, oldURL } = event;
      TrackEvent.emit(TrackEventType.ROUTE, { from: oldURL, to: newURL });
    });
  }
};

export const consoleProxy = (): void => {
  if (!('console' in _global)) {
    return;
  }
  const logType = ['log', 'error', 'debug', 'info', 'warn', 'assert', 'dir'];
  logType.forEach((level: string): void => {
    if (!(level in _global.console)) {
      return;
    }
    proxyHelper(_global.console, level, function (...args: any[]) {
      TrackEvent.emit(TrackEventType.CONSOLE, {
        logArgs: JSON.stringify(args),
        logType: level,
      } as IConsoleEventTrack);
    });
  });
};

export const domEventProxy = () => {
  if (!('document' in _global)) {
    return;
  }

  _global.document.addEventListener(
    'click',
    function (e: MouseEvent) {
      const nodes = e
        .composedPath()
        .filter((node: HTMLElement) => !isNil(node.tagName)) as HTMLElement[];
      nodes.forEach((node: HTMLElement, index: number) => {
        const point = node.getAttribute('bee-track-click');
        if (point) {
          const parsedPoint = json5.parse(point) as IDomEventTrack;
          const elementProperties = getElementInfoByEvent(e);
          TrackEvent.emit(TrackEventType.CLICK, {
            event: 'click',
            xpath: getEventElementPath(nodes, index),
            elementProperties,
            point: parsedPoint.point,
            params: parsedPoint.params,
          } as IDomEventTrack);
        }
      });
    },
    true,
  );
};

export const httpProxy = () => {
  XHRProxy();
  fetchProxy();
};

export const routeProxy = () => {
  historyProxy();
  listenHashChange();
};
