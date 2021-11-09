import Abstract from "./abstract.js";
const createCategoriesPage = (questions) => {
  console.log(questions)
  const createItemTemplate = (i) => {
    return `<div class="categories_item">
      <h3>${i+1}</h3>
      <img src="assets/img/paintings/${questions[i*10].imageNum}.jpg">
      <span>9/10</span>
    </div>`
  }
  const template = new Array(12).fill(null).map((item, index) => item = createItemTemplate(index)).join('');

  return `<header class="container categories_header">
  <h1>ArtQuiz</h1>
  <img src="./assets/img/logo.png" alt="logo">
</header>
<main class="container categories_main">
 <div class="categories_top">
    <button class="categories_home">Home</button>
    <h2>Categories</h2>
    <button class="categories_settings">Settings</button>
  </div>
  <div class="categories_list">
    ${template}
  </div>
</main>`
}

export default class CategoriesPage extends Abstract{
  constructor(questions) {
    super();
    this._questions = questions;
    this._categoriesChangeHandler = this._categoriesChangeHandler.bind(this);
  }

  setQuestion(questions) {
    this._questions = questions;
  }

  
  getTemplate() {
    return createCategoriesPage(this._questions);
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

}