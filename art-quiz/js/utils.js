const renderElement = (element, container) => {
  
  element = element.getElement();

  element.classList.add('hide', 'pages');
  requestAnimationFrame(() => {
    element.classList.add('show')
  });
  container.append(element);

};

const createElement = (template) => {
  const newElement = document.createElement('div');  
  newElement.innerHTML = template;
  return newElement;
};




export { renderElement, createElement };