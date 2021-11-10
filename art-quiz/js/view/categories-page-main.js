import Abstract from "./abstract.js";
const createCategoriesPageMain = (questions) => {
  const createItemTemplate = (i) => {
    return `<div class="categories_item">
      <h3>${i+1}</h3>
      <img src="assets/img/paintings/${questions[i*10].imageNum}.jpg">
      <span>9/10</span>
    </div>`
  }
  const template = new Array(12).fill(null).map((item, index) => item = createItemTemplate(index)).join('');

  return `<div class="categories_main">
    <div class="categories_top">
      <button class="categories_home">Home</button>
      <h2>Categories</h2>
      <button class="categories_settings">Settings</button>
    </div>
    <div class="categories_list">
      ${template}
    </div>
  </div>`
}

export default class CategoriesPageMain extends Abstract{
  constructor(questions) {
    super();
    this._questions = questions;
    this._categoriesChangeHandler = this._categoriesChangeHandler.bind(this);
    this._categoriesBackToMainHandler = this._categoriesBackToMainHandler.bind(this);
  }

  setQuestion(questions) {
    this._questions = questions;    
  }
  
  getTemplate() {    
    return createCategoriesPageMain(this._questions);
  }

  _categoriesChangeHandler(index) {
    this._callback.categoryChange(index)
  }

  setCategories(callback) {
    this._callback.categoryChange = callback;
    this.getElement().querySelectorAll('.categories_item').forEach((item, index) => {
      item.addEventListener('click',()=> this._categoriesChangeHandler(index))
    })
  }
  _categoriesBackToMainHandler(evt) {
    evt.preventDefault();
    this._callback.backToMain()
  }

  backToMain(callback) {
    this._callback.backToMain = callback;
    this.getElement().querySelector('.categories_home').addEventListener('click', this._categoriesBackToMainHandler);

  }
}