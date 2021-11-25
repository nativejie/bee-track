import mitt from 'mitt';
import { logger } from '@bee/track-utils';
import {
  TrackEventType,
  IHttpTack,
  IReportExtraData,
  IDomEventTrack,
} from '@bee/track-shared';
import { domEventTransform, httpTransform, report } from '.';
type EventCallback =
  | Record<string, any>
  | IHttpTack
  | IDomEventTrack
  | ((event: IHttpTack | IDomEventTrack) => void);

type Events = {
  [key in TrackEventType]: EventCallback;
};

export const TrackEvent = mitt<Events>();

TrackEvent.on(TrackEventType.HTTP, (httpTrack: IHttpTack) => {
  const data = httpTransform(httpTrack);
  logger.log('Http Event Fire: ', data);
  report.send(data);
});

TrackEvent.on(TrackEventType.ROUTE, (httpTrack: IHttpTack) => {
  console.log(httpTrack);
});

TrackEvent.on(TrackEventType.CLICK, (clickTrack: IDomEventTrack) => {
  const data = domEventTransform(clickTrack);
  report.send(data);
});
