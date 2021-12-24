import { _global } from '.';

export const getEventElementPath = (nodes: HTMLElement[], index: number) => {
  let xpath = '';
  let tagName = '';
  let id = '';
  const len = nodes.length;
  let node: HTMLElement;
  for (let i = index; i < len; i++) {
    node = nodes[i];
    tagName = node.tagName;
    id = node.id;
    xpath =
      `${tagName}${id ? '#' + id : ''}${i === index ? '' : ' > '}` + xpath;
  }
  return xpath;
};

export const getElementInfo = (target: HTMLElement) => {
  const { id: elementId, tagName } = target;
  const elementTagName = tagName.toLowerCase();
  const elementStyle = target.getAttribute('style') || '';
  const elementType = target.getAttribute('type') || '';
  const elementClassName = target.classList.value;
  const elementContent =
    elementTagName === 'body'
      ? '<body>'
      : `<${elementTagName}${elementId ? ' id="' + elementId + '"' : ''}${
          elementStyle ? ' style="' + elementStyle + '"' : ''
        }${elementClassName ? ' class="' + elementClassName + '"' : ''}${
          elementType ? ' type="' + elementType + '"' : ''
        }>${target.innerHTML}</${elementTagName}>`;
  return {
    elementId,
    elementTagName,
    elementClassName,
    elementStyle,
    elementContent,
  };
};

export const getCookie = (key: string) => {
  if (!('document' in _global)) {
    return '';
  }
  const cookies = _global.document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const [cookieKey, cookieValue] = cookies[i].split('=');
    if (cookieKey === key) {
      return cookieValue;
    }
  }
  return '';
};

export const getUrlQuery = (url: string): Record<string, any> => {
  if (url.indexOf('?') < 0) {
    return {};
  }
  const query = url.substr(url.indexOf('?') + 1);
  const queryObject = {};
  if (query) {
    query.split('&').forEach((q) => {
      queryObject[q.split('=')[0]] = unescape(q.split('=')[1]);
    });
  }
  return queryObject;
};
