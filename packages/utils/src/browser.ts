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

export const getElementInfoByEvent = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const { id: elementId, tagName } = target;
  const elementTagName = tagName.toLowerCase();
  const elementStyle = target.getAttribute('style') || '';
  const elementClassName = target.classList.value;
  const elementContent =
    elementTagName === 'body'
      ? '<body>'
      : `<${elementTagName}${elementId ?? ' id="' + elementId + '"'}${
          elementStyle ?? ' style="' + elementStyle + '"'
        }${elementClassName ?? ' class="' + elementClassName + '"'}>${
          target.innerHTML
        }</${elementTagName}>`;
  return {
    elementId,
    elementTagName,
    elementClassName,
    elementStyle,
    elementContent,
  };
};
