import mitt from 'mitt';
import {
  TrackEventType,
  IHttpTack,
  IDomEventTrack,
  IRouteEventTrack,
  IConsoleEventTrack,
} from '@bee/track-shared';
import {
  domEventTransform,
  httpTransform,
  report,
  routeTransform,
  record,
  consoleEventTransform,
} from '.';

type EventCallback =
  | Record<string, any>
  | IHttpTack
  | IDomEventTrack
  | IRouteEventTrack
  | IConsoleEventTrack
  | ((event: IHttpTack | IDomEventTrack) => void);

type Events = {
  [key in TrackEventType]: EventCallback;
};

export const TrackEvent = mitt<Events>();

TrackEvent.on(TrackEventType.HTTP, (httpTrack: IHttpTack) => {
  const data = httpTransform(httpTrack);
  record.push(data);
  report.send(data);
});

TrackEvent.on(TrackEventType.ROUTE, (routeTrack: IRouteEventTrack) => {
  const data = routeTransform(routeTrack);
  record.push(data);
  report.send(data);
});

TrackEvent.on(TrackEventType.DOM, (eventTrack: IDomEventTrack) => {
  const data = domEventTransform(eventTrack);
  record.push(data);
  report.send(data);
});

TrackEvent.on(TrackEventType.CONSOLE, (consoleTrack: IConsoleEventTrack) => {
  const data = consoleEventTransform(consoleTrack);
  record.push(data);
  report.send(data);
});
