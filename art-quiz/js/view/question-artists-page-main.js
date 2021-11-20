import { COUNT_QUESTION } from "../const.js";
import Abstract from "./abstract.js";

const createQuestionArtistsPageMain = (question, allQuestions, answers, countAnswers) => {
  const uniqueAuthors = [...new Set(allQuestions.map(item => item.author))]

  const wrongAuthors = uniqueAuthors.filter(item => item != question.author)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  wrongAuthors.push(question.author);

  const allAuthors = wrongAuthors.sort(() => Math.random() - 0.5);

  const authorsTemplate = () => {
    return allAuthors.map(item => item = `<li>${item}</li>`)
      .join('');
  }
  const createAnswersTemplate = (check) => {
    return `<li class="${check?'true':'false'}"></li>`
  }

  const answersTemplate = new Array(COUNT_QUESTION).fill(null)
    .map((item, index) => item = (index < countAnswers) ? createAnswersTemplate(answers[index]) : '<li></li>')
    .join('');

  return `<div class="question_main">
    <div class="question_painting_image">
      <img src="./assets/img/paintings/${question.imageNum}.jpg">
      <ul>
        ${answersTemplate}
      </ul>
    </div>
    <div class="question_painting_answers">
      <ul>
        ${authorsTemplate()}
      </ul>
    </div>
  </div>`
}

export default class QuestionArtistsMain extends Abstract {
  constructor(question, allQuestions,answers, index) {
    super();
    this._question = question;
    this._allQuestions = allQuestions;
    this._answers = answers;
    this._index = index;
    this._checkAnswerHandler = this._checkAnswerHandler.bind(this)
  }

  getTemplate() {
    return createQuestionArtistsPageMain(this._question, this._allQuestions, this._answers, this._index)
  }
  
  _checkAnswerHandler(evt) {
    this._callback.checkAnswer(evt.target.textContent);
  }

  checkAnswer(callback) {
    this._callback.checkAnswer = callback;
    this.getElement().querySelectorAll('.question_painting_answers li').forEach(item => {
      item.addEventListener('click', this._checkAnswerHandler)
    })
  }
}