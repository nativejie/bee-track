import { TrackEvent } from '@bee/track-core';
import { TrackEventType } from '@bee/track-shared';
import { getElementInfo, getEventElementPath, isNil } from '@bee/track-utils';

export const addEvent = (
  el: HTMLElement,
  event: 'click' | 'focus' | 'blur',
  value: { point: string; params: Record<string, any> },
) => {
  el.addEventListener(
    event,
    (e: MouseEvent) => {
      const nodes = e
        .composedPath()
        .filter((node: HTMLElement) => !isNil(node.tagName)) as HTMLElement[];
      const elementProperties = getElementInfo(e.target as HTMLElement);
      const { point, params } = value;
      TrackEvent.emit(TrackEventType.DOM, {
        event,
        xpath: getEventElementPath(nodes, nodes.length - 1),
        elementProperties,
        point,
        params,
      });
    },
    true,
  );
};
