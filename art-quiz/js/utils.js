const renderElement = (element, container) => {
  element = element.getElement();
  container.append(element);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement;
};


export { renderElement, createElement };