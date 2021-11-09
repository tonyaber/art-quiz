import StartPageHeader from "./view/start-page-header.js";
import StartPageMain from "./view/start-page-main.js";
import { renderElement, createElement } from './utils.js';
import CategoriesPage from "./view/categories-page.js"
import images from "./images.js";

export default class Quiz {
  constructor() {
    this._type = '';
    this._category = 0;
    this._allQuestions = images;
    this._categoriesQuestions = [];
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._categoriesChange = this._categoriesChange.bind(this);
  }

  init() {
    this._startPageHeader = new StartPageHeader();
    this._startPageMain = new StartPageMain();
    this._categoriesPage = new CategoriesPage(this._categoriesQuestions);
    this._startPageMain.setTypeChangeHandler(this._typeChangeHandler);
    this._renderStartPage();
  }

  _renderStartPage() {
    const header = document.querySelector('header');
    const main = document.querySelector('main')
    renderElement(this._startPageHeader, header);
    renderElement(this._startPageMain, main);
  }

  _renderCategoriesPage() {
    this._startPageMain.getElement().remove();
    this._startPageHeader.getElement().remove();
    const main = document.querySelector('main');
    renderElement(this._categoriesPage, main)
    this._categoriesPage.setCategories(this._categoriesChange);
  }

  _typeChangeHandler(type) {
    this._type = type;
    switch (this._type) {
      case 'artists':
        this._categoriesQuestions = this._allQuestions.slice(0, 120);
        break;    
      default:
        this._categoriesQuestions = this._allQuestions.slice(120)
        break;
    }

    this._categoriesPage.setQuestion(this._categoriesQuestions)
    this._renderCategoriesPage();
  }

  _categoriesChange(index) {
    switch (this._type) {
      case 'artists':
        this._category = index
        break;
      default:
        this._category = index + 12;
        break;
    }
    this._categoriesQuestions = this._allQuestions.slice(index * 12, 10 )
    console.log(this._categoriesQuestions)
  }

  createQuestions() {
    
  }
  checkAnswer() {
    
  }
}