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
  removeElement() {
    this._element = null;
  }
}