import Abstract from "./abstract.js";
const createPopup = (count) => {
  return `<div class="popup">
    <div class="modal_result">
      <span>Result</span>
      <span>${count}/10</span>
      <img src="./assets/svg/end_category.svg" alt="result">
      <button>Next quiz</button>
    </div>`
}

export default class PopupEndOfCategory extends Abstract {
  constructor(count) {
    super();
    this._count = count;
    this._endCategoryHandler = this._endCategoryHandler.bind(this);
  }

  destroy() {
    this.getElement().remove();
    this._element = null;
  }

  getTemplate() {
    return createPopup(this._count);
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