import { renderElement } from './utils.js';
import StartPageHeader from "./view/start-page-header.js";
import StartPageMain from "./view/start-page-main.js";
import CategoriesPageMain from "./view/categories-page-main.js";
import CategoriesPageHeader from './view/categories-page-header.js';
import QuestionPaintingMain from './view/question-painting-page-main.js';
import QuestionPaintingHeader from './view/question-painting-page-header.js';
import QuestionModel from './question-model.js';

const header = document.querySelector('header');
const main = document.querySelector('main')

export default class Quiz {
  constructor() {
    this._type = '';
    this._indexCategoryStart = 0;
    this._indexQuestion = 0;
    this._allQuestions = [];
    this._categories = [];
    this._question = {};
    this._categoriesQuestions = [];
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._categoriesChangeHandler = this._categoriesChangeHandler.bind(this);
    this._nextImageHandler = this._nextImageHandler.bind(this);
    this._backToMainHandler = this._backToMainHandler.bind(this);
  }

  init() {
    this._questionModel = new QuestionModel();
    this._startPageHeader = new StartPageHeader();
    this._startPageMain = new StartPageMain();
    this._categoriesPageHeader = new CategoriesPageHeader();
    this._categoriesPageMain = new CategoriesPageMain(this._categories);
    
    this._renderStartPage();
  }

  _renderStartPage() {    
    renderElement(this._startPageHeader, header);
    renderElement(this._startPageMain, main);
    this._startPageMain.setTypeChangeHandler(this._typeChangeHandler);
  }

  _renderCategoriesPage() {
    renderElement(this._categoriesPageHeader, header);
    renderElement(this._categoriesPageMain, main);    
    this._categoriesPageMain.setCategories(this._categoriesChangeHandler);
    this._categoriesPageMain.backToMain(this._backToMainHandler);
  }

  _renderPageAfterGame() {
    renderElement(this._categoriesPageHeader, header);
    renderElement(this._categoriesPageMain, main);
  }

  _typeChangeHandler(type) {
    this._startPageHeader.destroy();
    this._startPageMain.destroy();
    this._type = type;
    this._categories = this._questionModel.getCategories(type)
    this._categoriesPageMain.setQuestion(this._categories);
   
    this._renderCategoriesPage();
  }

  _categoriesChangeHandler(index) {
    this._indexQuestion = 0;
    this._categoriesQuestions = this._questionModel.getCategoriesQuestions(index);
    this._categoriesPageMain.destroy();
    this._categoriesPageHeader.destroy();
    this._renderQuestion();
  }

  _backToMainHandler() {
    this._categoriesPageMain.destroy();
    this._categoriesPageHeader.destroy();
    this._renderStartPage()
  }

  _nextImageHandler() {
    if (this._indexQuestion < 9) {
      this._questionPainingMain.destroy();
      this._indexQuestion++;
      this._showQuestion();
    } else {
      this._questionPainingMain.destroy();
      this._questionPainingHeader.destroy()
      this._renderCategoriesPage()
    }
  }

  _showQuestion() {   
    this._question = this._categoriesQuestions[this._indexQuestion];
    this._questionPainingMain = new QuestionPaintingMain(this._question, this._allQuestions);
    renderElement(this._questionPainingMain, main);
    this._questionPainingMain.nextImage(this._nextImageHandler)
  }

  _renderQuestion() {
    this._questionPainingHeader = new QuestionPaintingHeader();    
    renderElement(this._questionPainingHeader, header);
    this._showQuestion();
  }

  checkAnswer() {
    
  }
}