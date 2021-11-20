import { LANGUAGE } from '../const.js';
import Abstract from './abstract.js';

const createPopup = (count, language) => {
  const imageTemplate = count > 7 ? './assets/img/bravo.jpg' : './assets/img/try_again.jpg';
  return `<div class="popup">
    <div class="modal_result modal">
      <span>${LANGUAGE[language].result}</span>
      <span>${count}/10</span>
      <img src=${imageTemplate} alt="result">
      <button>${LANGUAGE[language].next}</button>
    </div>`;
};

export default class PopupEndOfCategory extends Abstract {
  constructor(count, language) {
    super();
    this._count = count;
    this._language = language;
    this._endCategoryHandler = this._endCategoryHandler.bind(this);
  }

  destroy() {
    this.getElement().remove();
    this._element = null;
  }

  getTemplate() {
    return createPopup(this._count, this._language);
  }

  _endCategoryHandler(evt) {
    evt.preventDefault();
    this._callback.nextCategory();
  }

  endOfCategory(callback) {
    this._callback.nextCategory = callback;
    this.getElement().querySelector('button').addEventListener('click', this._endCategoryHandler);
  }
}
