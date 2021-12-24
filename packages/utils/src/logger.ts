import { _extra, _global } from '.';
import { LOGGER_PREFIX } from '@bee/track-shared';

export class Logger {
  private _console: Console = {} as Console;
  private enabled = false;

  constructor() {
    _global.console = console || _global.console;
    if (console || _global.console) {
      const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
      logType.forEach((level) => {
        if (!(level in _global.console)) return;
        this._console[level] = _global.console[level];
      });
    }
  }

  getStatus(): boolean {
    return this.enabled;
  }

  disable(): void {
    this.enabled = false;
  }

  enable(): void {
    this.enabled = true;
  }

  log(...args: any[]): void {
    if (!this.enabled) {
      return;
    }
    this._console.log(`[LOG] ${LOGGER_PREFIX}: `, ...args);
  }

  warn(...args: any[]): void {
    if (!this.enabled) {
      return;
    }
    this._console.warn(`[WARNING] ${LOGGER_PREFIX}: `, ...args);
  }

  error(...args: any[]): void {
    if (!this.enabled) {
      return;
    }
    this._console.error(`[ERROR] ${LOGGER_PREFIX}: `, ...args);
  }
}
const logger = _extra.logger || (_extra.logger = new Logger());
export { logger };
