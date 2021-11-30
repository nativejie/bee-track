import { ITackOptions } from '@bee/track-shared';
import { logger, _extra } from '@bee/track-utils';
import {
  documentEventProxy,
  fetchProxy,
  historyProxy,
  listenHashChange,
  report,
} from '.';
import { XHRProxy } from './proxy';
const initOptions = (options: ITackOptions) => {
  _extra.options = options;
  if (options.debug === true) {
    logger.enable();
  }
  report.setting(options);
};

const proxy = (options: ITackOptions) => {
  const { httpProxy, domEventProxy, routeProxy } = options;
  console.log('proxy something');
  if (httpProxy === true) {
    XHRProxy();
    fetchProxy();
  }
  if (domEventProxy === true) {
    documentEventProxy();
  }
  if (routeProxy === true) {
    historyProxy();
    listenHashChange();
  }
};

export const setup = async (options: ITackOptions) => {
  initOptions(options);
  proxy(options);
};
