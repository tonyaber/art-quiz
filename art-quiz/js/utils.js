const renderElement = (element, container) => {
  
  element = element.getElement();

  element.classList.add('hide', 'pages');
  requestAnimationFrame(() => {
    element.classList.add('show')
  });
  container.append(element);

};


const renderPopup = (element, container) => {

  element = element.getElement();

  element.classList.add('pages');
  requestAnimationFrame(() => {
    element.querySelector('.modal').classList.add('modal-show')
  });
  
  container.append(element);
}

const createElement = (template) => {
  const newElement = document.createElement('div');  
  newElement.innerHTML = template;
  return newElement;
};




export { renderElement, createElement, renderPopup };