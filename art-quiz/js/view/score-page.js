import Abstract from "./abstract.js"

const createScorePage = (questions, answers) => {
  const createItemTemplate = (index) => {
    return `<div class="score-item ${answers[index] ? 'check' : ''}">
            <h3>${index + 1}</h3>
            <img class="check" src="./assets/svg/${answers[index] ? 'correct_answer' : 'wrong_answer'}.svg" alt="check">
            <img class="image" src="https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings/${questions[index]['imageNum']}.jpg" alt="image">
            <div class="answer">
              <span>${questions[index]['name']}</span>
              <span>${questions[index]['author']}</span>
              <span>${questions[index]['year']}</span>
            </div>
          </div>`
  }

  const itemTemplate = new Array(10).fill(null).map((item, index) => item = createItemTemplate(index)).join('');

  return `<div class="score_main">
        <div class="score-top">
          <button class="score_home">Home</button>
          <h2>Score</h2>
          <button class="score_category">Category</button>
        </div>
        <div class="score-list">
          ${itemTemplate}
        </div>
      </div>`
}

export default class ScorePage extends Abstract {
  constructor(questions, answers) {
    super();
    this._questions = questions;
    this._answers = answers;
    this._backToHomeHandler = this._backToHomeHandler.bind(this);
    this._backToCategory = this._backToCategory.bind(this);
  }
  getTemplate() {
    return createScorePage(this._questions, this._answers);
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
}