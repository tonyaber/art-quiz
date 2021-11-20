import { COUNT_QUESTION, LANGUAGE } from "../const.js";
import Abstract from "./abstract.js"

const createScorePage = (questions, answers, language) => {
  
  const createItemTemplate = (index) => {
    return `<div class="score-item ${answers[index] ? 'check' : ''}">
            <h3>${index + 1}</h3>
            <img class="check" src="./assets/svg/${answers[index] ? 'correct_answer' : 'wrong_answer'}.svg" alt="check">
            <img class="image" src="./assets/img/paintings/${questions[index]['imageNum']}.jpg" alt="image">
            <div class="answer">
              <span>${questions[index]['name']}</span>
              <span>${questions[index]['author']}</span>
              <span>${questions[index]['year']}</span>
            </div>
          </div>`
  }

  const itemTemplate = new Array(COUNT_QUESTION).fill(null).map((item, index) => item = createItemTemplate(index)).join('');

  return `<div class="score_main">
        <div class="score-top">
          <button class="score_home">${LANGUAGE[language]['home']}</button>
          <h2>${LANGUAGE[language]['score']}</h2>
          <button class="score_category">${LANGUAGE[language]['categories']}</button>
        </div>
        <div class="score-list">
          ${itemTemplate}
        </div>
      </div>`
}

export default class ScorePage extends Abstract {
  constructor(questions, answers, language) {
    super();
    this._questions = questions;
    this._answers = answers;
    this._language = language;
    this._backToHomeHandler = this._backToHomeHandler.bind(this);
    this._backToCategory = this._backToCategory.bind(this);
    this.showInformation();
  }
  getTemplate() {
    return createScorePage(this._questions, this._answers, this._language);
  }

  _backToHomeHandler(evt) {
    evt.preventDefault();
    this._callback.backToMain();
  }

  _backToCategory(evt) {
    evt.preventDefault();
    this._callback.backToCategory();
  }

  backToMain(callback) {
    this._callback.backToMain = callback;
    this.getElement().querySelector('.score_home').addEventListener('click', this._backToHomeHandler);
  }

  backToCategory(callback) {
    this._callback.backToCategory = callback;
    this.getElement().querySelector('.score_category').addEventListener('click', this._backToCategory);
  }

  showInformation() {
    this.getElement().querySelectorAll('.score-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      })
    })
  }
}