import Abstract from "./abstract.js";
const createCategoriesPageMain = (questions, answers) => {
  const createItemTemplate = (index) => {
    const templateCount = answers[index]['isPlay'] ? answers[index]['count'] + '/10' : '';
    return `<div class="categories_item ${answers[index]['isPlay'] ? 'passed' :''}">
      <h3>${index+1}</h3>
      <img src="https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings/${questions[index*10].imageNum}.jpg" alt="category image">
      <span>${templateCount}</span>
      <button>Score</button>
    </div>`
  }
  
  const templateCategories = new Array(12).fill(null).map((item, index) => item = createItemTemplate(index)).join('');

  return `<div class="categories_main">
    <div class="categories_top">
      <button class="categories_home">Home</button>
      <h2>Categories</h2>
      <button class="categories_settings"><img src="./assets/svg/setting.svg">Settings</button>
    </div>
    <div class="categories_list">
      ${templateCategories}
    </div>
  </div>`
}

export default class CategoriesPageMain extends Abstract{
  constructor(questions) {
    super();
    this._questions = questions;
    this._answers;
    this._type;
    this._categoriesChangeHandler = this._categoriesChangeHandler.bind(this);
    this._categoriesBackToMainHandler = this._categoriesBackToMainHandler.bind(this);
    this._showResultHandler = this._showResultHandler.bind(this);
  }

  setQuestion(questions) {
    this._questions = questions;    
  }

  setAnswers(answers) {
    this._answers = answers;
  }
  
  getTemplate() {    
    return createCategoriesPageMain(this._questions, this._answers);
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

  _showResultHandler(evt, index) {
    evt.stopPropagation();
    this._callback.showResult(index);
  }

  backToMain(callback) {
    this._callback.backToMain = callback;
    this.getElement().querySelector('.categories_home').addEventListener('click', this._categoriesBackToMainHandler);
  }

  showResult(callback) {
    this._callback.showResult = callback;
    this.getElement().querySelectorAll('.categories_item button').forEach((item, index) => {
      item.addEventListener('click', (evt) => this._showResultHandler(evt, index));
    })
  }
}