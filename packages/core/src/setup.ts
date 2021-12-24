import { ITackOptions } from '@bee/track-shared';
import { logger, _extra, _global } from '@bee/track-utils';
import { record, report } from '.';

export const setup = async (options: ITackOptions) => {
  _extra.options = options;
  if (options.debug === true) {
    logger.enable();
  }
  report.setting(options);
  record.setting(options);
};
