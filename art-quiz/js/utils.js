const renderElement = (element, container) => {
  const newElement = element.getElement();

  newElement.classList.add('hide', 'pages');
  requestAnimationFrame(() => {
    newElement.classList.add('show');
  });
  container.append(newElement);
};

const renderPopup = (element, container) => {
  const newElement = element.getElement();

  newElement.classList.add('pages');
  requestAnimationFrame(() => {
    newElement.querySelector('.modal').classList.add('modal-show');
  });

  container.append(newElement);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement;
};

export { renderElement, createElement, renderPopup };
