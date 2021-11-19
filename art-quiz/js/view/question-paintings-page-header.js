import Abstract from "./abstract.js";

const createQuestionPaintingsPageHeader = (question) => {
  
  return `<div class="question_header">
    <h1>ArtQuiz</h1>
    <div class="question_header_container">
      <img src="./assets/img/logo.png" alt="logo">
      <h2>What painting did ${question.author} paint?</h2>
      <div class="time">
      </div>
    </div>
  </div>`
}

export default class QuestionPaintingsHeader extends Abstract {
  constructor(question) {
    super();
    this._question = question;
    this._backToMainHandler = this._backToMainHandler.bind(this);
  }
  
  getTemplate() {
    return createQuestionPaintingsPageHeader(this._question);
  }

  getTimeContainer() {
    return this.getElement().querySelector('.time')
  }

  _backToMainHandler(evt) {
    evt.preventDefault();
    this._callback.backToMain()
  }

  backToMain(callback) {
    this._callback.backToMain = callback;
    this.getElement().querySelector('img').addEventListener('click', this._backToMainHandler);
  }
  
}