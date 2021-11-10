import Abstract from "./abstract.js";

const createQuestionPaintingPageMain = (question, allQuestions) => {
  return `<div class="question_main">
    <div class="question_painting_image">
      <img src="./assets/img/paintings_full/${question.imageNum}full.jpg">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="question_painting_answers">
      <ul>
        <li>${question.author}</li>
        <li>${question.author}</li>
        <li>${question.author}</li>
        <li>${question.author}</li>
      </ul>
    </div>
  </div>`
}

export default class QuestionPaintingMain extends Abstract {
  constructor(question, allQuestions) {
    super();
    this._question = question;
    this._allQuestions = allQuestions;
    this._nextImageHandler = this._nextImageHandler.bind(this)
  }

  setQuestion(question) {
    this._question = question;
    console.log(this._question)
  }

  getTemplate() {
    return createQuestionPaintingPageMain(this._question, this._allQuestions)
  }
  _nextImageHandler() {
    this._callback.nextImage();
  }

  nextImage(callback) {
    this._callback.nextImage = callback;
    this.getElement().querySelectorAll('.question_painting_answers li').forEach(item => {
      item.addEventListener('click', this._nextImageHandler)
    })
  }
}