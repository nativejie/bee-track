import { _global } from '@bee/track-utils';
import { setup } from '@bee/track-core';
import { ITackOptions } from '@bee/track-shared';

const init = (options: ITackOptions): void => {
  if (!('XMLHttpRequest' in _global) || options.disable === true) {
    return;
  }
  options = { ...options, domEventProxy: true };
  setup(options);
};

export { init };
