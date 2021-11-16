import { renderElement, renderPopup} from './utils.js';
import StartPageHeader from "./view/start-page-header.js";
import StartPageMain from "./view/start-page-main.js";
import CategoriesPageMain from "./view/categories-page-main.js";
import CategoriesPageHeader from './view/categories-page-header.js';
import QuestionPaintingMain from './view/question-painting-page-main.js';
import QuestionPaintingHeader from './view/question-painting-page-header.js';
import QuestionModel from './question-model.js';
import PopupAnswer from './view/popup-answer.js';
import PopupEndOfCategory from './view/popup-end-of-category.js';
import ScorePage from './view/score-page.js';
import QuestionArtistsHeader from './view/question-artists-page-header.js';
import QuestionArtistsMain from './view/question-artists-page-main.js';
import SettingPage from './view/setting-page.js';

const body = document.querySelector('body');
const header = body.querySelector('header');
const main = body.querySelector('main');


export default class Quiz {
  constructor() {
    this._type = '';
    this._indexQuestion = 0;
    this._indexCategory = 0;
    this._allQuestions = [];
    this._categories = [];
    this._question = {};
    this._categoriesQuestions = [];
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._categoriesChangeHandler = this._categoriesChangeHandler.bind(this);
    this._checkAnswerHandler = this._checkAnswerHandler.bind(this);
    this._nextImageHandler = this._nextImageHandler.bind(this);
    this._backToMainHandler = this._backToMainHandler.bind(this);
    this._endOfCategoryHandler = this._endOfCategoryHandler.bind(this);
    this._showResultHandler = this._showResultHandler.bind(this);
    this._backToMainFromScoreHandler = this._backToMainFromScoreHandler.bind(this);
    this._backToCategoryHandler = this._backToCategoryHandler.bind(this);
    this._showSettingHandlerMain = this._showSettingHandlerMain.bind(this);
    this._showSettingHandlerCategory = this._showSettingHandlerCategory.bind(this);
    this._saveSettingHandler = this._saveSettingHandler.bind(this);
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
    this._startPageMain.showSetting(this._showSettingHandlerMain);
  }

  _renderCategoriesPage() {
    this._categoriesPageMain.setQuestion(this._categories);
    this._categoriesPageMain.setAnswers(this._questionModel.getCheckAnswerForCategory());
    renderElement(this._categoriesPageHeader, header);
    renderElement(this._categoriesPageMain, main);
    
    this._categoriesPageMain.setCategories(this._categoriesChangeHandler);
    this._categoriesPageMain.backToMain(this._backToMainHandler);
    this._categoriesPageMain.showResult(this._showResultHandler);
    this._categoriesPageMain.showSetting(this._showSettingHandlerCategory);
  }

  _renderPageAfterGame() {
    renderElement(this._categoriesPageHeader, header);
    renderElement(this._categoriesPageMain, main);
  }

  _renderQuestion() {
    this._allQuestions = this._questionModel.getAllQuestions();
    //вытянуть с модели все 10 вопросов и варианты ответов
    //масив с 10 вопросов, каждый имеет 4 варианта ответа
    //
    this._showQuestion();
  }

  _showQuestion() {   
    this._question = this._categoriesQuestions[this._indexQuestion];
    const answers = this._questionModel.getCheckAnswer(this._indexCategory);
    switch (this._type) {
      case 'artists':
        this._questionPainingHeader = new QuestionPaintingHeader();
        this._questionPainingMain = new QuestionPaintingMain(this._question, this._allQuestions, answers, this._indexQuestion);
        break;
      default:
        this._questionPainingHeader = new QuestionArtistsHeader(this._question);
        this._questionPainingMain = new QuestionArtistsMain(this._question, this._allQuestions, answers, this._indexQuestion);
    }
    
    renderElement(this._questionPainingHeader, header);
    renderElement(this._questionPainingMain, main);
    this._questionPainingMain.checkAnswer(this._checkAnswerHandler)
  }

  

  _typeChangeHandler(type) {
    this._startPageHeader.destroy();
    this._startPageMain.destroy();
    this._type = type;
    this._categories = this._questionModel.getCategories(type)

    this._renderCategoriesPage();
  }

  _categoriesChangeHandler(index) {
    this._indexCategory = index;
    this._indexQuestion = 0;
    this._categoriesQuestions = this._questionModel.getCategoriesQuestions(this._indexCategory);
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
      this._popupAnswer.destroyPopup();
      this._questionPainingHeader.destroy();
      this._questionPainingMain.destroy();
      this._indexQuestion++;
      this._showQuestion();
    } else {
      this._popupAnswer.destroyPopup();
      const countRightAnswer = this._questionModel.getCheckAnswerForCategory()[this._indexCategory]['count'];
      this._popupEndOfCategory = new PopupEndOfCategory(countRightAnswer);
      renderPopup(this._popupEndOfCategory, body);
      this._popupEndOfCategory.endOfCategory(this._endOfCategoryHandler);
    }
  }

  _endOfCategoryHandler() {
    this._popupEndOfCategory.destroyPopup();
    this._questionPainingMain.destroy();
    this._questionPainingHeader.destroy()
    this._renderCategoriesPage()
  }

  _checkAnswerHandler(answer) {
    const check = (this._type == 'artists') ? answer == this._question.author : answer == this._question.imageNum;

    if (check) {
      this._popupAnswer = new PopupAnswer(this._question, true);
      
    } else {
      this._popupAnswer = new PopupAnswer(this._question, false);
    }
    this._questionModel.setCheckAnswer(this._indexQuestion, check)
    this._popupAnswer.nextImage(this._nextImageHandler)
    renderPopup(this._popupAnswer, body);
  }

  _backToMainFromScoreHandler() {
    this._scorePage.destroy();
    this._categoriesPageHeader.destroy();
    this._renderStartPage();
  }

  _backToCategoryHandler() {
    this._scorePage.destroy();
    this._renderCategoriesPage();
  }

  _showResultHandler(index) {
    this._categoriesPageMain.destroy();
    let questions = this._questionModel.getCategoriesQuestions(index);
    let answers = this._questionModel.getCheckAnswer(index);  

    this._scorePage = new ScorePage(questions, answers);
    this._scorePage.backToMain(this._backToMainFromScoreHandler);
    this._scorePage.backToCategory(this._backToCategoryHandler);

    renderElement(this._scorePage, main);
  }

  _showSettingHandlerMain() {
    this._startPageMain.destroy();
    this._settingPage = new SettingPage();
    this._settingPage.saveSetting(this._saveSettingHandler);
    renderElement(this._settingPage, main);
  }

  _showSettingHandlerCategory() {
    this._categoriesPageMain.destroy();
    this._settingPage = new SettingPage();
    this._settingPage.saveSetting(this._saveSettingHandler);
    renderElement(this._settingPage, main);
  }

  _saveSettingHandler() {
    this._settingPage.destroy();
    //создать модель настроек, 
    this._renderStartPage();
  }
}