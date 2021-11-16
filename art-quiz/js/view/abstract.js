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
    this._element.classList.remove('show')
    this._element.classList.add('hide');
    this._element.onanimationend = () => {
      this.getElement().remove();
      this._element = null;
    }
  }
  destroyPopup() {
    this._element.querySelector('.modal').classList.remove('modal-show')
    this._element.querySelector('.modal').classList.add('modal-hide');
    this._element.onanimationend = () => {
      this.getElement().remove();
      this._element = null;
    }
  }
}