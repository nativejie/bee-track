import { ITackOptions } from '@bee/track-shared';
import { logger, _extra } from '@bee/track-utils';
import { documentEventProxy, historyProxy, report } from '.';
import { XHRProxy } from './proxy';
const initOptions = (options: ITackOptions) => {
  _extra.options = options;
  if (options.debug === true) {
    logger.enable();
  }
  report.setting(options);
};

const proxy = (options: ITackOptions) => {
  XHRProxy();
  historyProxy();
  documentEventProxy();
  console.log('proxy something');
};

export const setup = async (options: ITackOptions) => {
  initOptions(options);
  proxy(options);
};