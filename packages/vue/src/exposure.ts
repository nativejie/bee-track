import { IDomEventTrack, TrackEventType } from '@bee/track-shared';
import { TrackEvent } from '@bee/track-core';
import { getElementInfo, logger } from '@bee/track-utils';

class Exposure {
  private _observe: IntersectionObserver;
  private trackParams: IDomEventTrack;

  constructor(threshold: number | number[] = 0.75) {
    this._observe = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { isIntersecting, target } = entry;
          if (isIntersecting) {
            const { point, params } = this.trackParams;
            TrackEvent.emit(TrackEventType.DOM, {
              event: 'exposure',
              xpath: '/',
              elementProperties: getElementInfo(target as HTMLElement),
              point,
              params,
            });
            this.unobserve(target);
          }
        });
      },
      {
        threshold,
      },
    );
  }

  observe(el: Element) {
    this._observe.observe(el);
  }

  unobserve(el: Element) {
    this._observe.unobserve(el);
  }

  add(el: Element, trackParams: IDomEventTrack) {
    this.observe(el);
    this.trackParams = trackParams;
  }
}

export const exposure = new Exposure();
