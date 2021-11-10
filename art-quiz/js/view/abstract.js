import { createElement } from "../utils.js";

export default class Abstract {
  constructor(){
    this._callback = {};
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  destroy() {
    this._element.classList.remove('show');
    this._element.classList.add('hide');
    setTimeout(() => {
      this.getElement().remove();
      this._element = null;
    }, 500);
    
    
  }
}