import { COUNT_QUESTION } from '../const.js';
import Abstract from './abstract.js';

const createQuestionArtistsPageMain = (variants, answers, countAnswers, photo) => {
  const authorsTemplate = () => variants.map((item) => `<li>${item}</li>`)
    .join('');
  const createAnswersTemplate = (check) => `<li class="${check ? 'true' : 'false'}"></li>`;

  const answersTemplate = new Array(COUNT_QUESTION).fill(null)
    .map((item, index) => ((index < countAnswers) ? createAnswersTemplate(answers[index]) : '<li></li>'))
    .join('');
  const srcImage = URL.createObjectURL(photo);
  return `<div class="question_main">
    <div class="question_painting_image">
      <img src="${srcImage}">
      <ul>
        ${answersTemplate}
      </ul>
    </div>
    <div class="question_painting_answers">
      <ul>
        ${authorsTemplate()}
      </ul>
    </div>
  </div>`;
};

export default class QuestionArtistsMain extends Abstract {
  constructor(variants, answers, index, photo) {
    super();
    this._variants = variants;
    this._answers = answers;
    this._index = index;
    this._photo = photo;
    this._checkAnswerHandler = this._checkAnswerHandler.bind(this);
  }

  getTemplate() {
    return createQuestionArtistsPageMain(this._variants, this._answers, this._index, this._photo);
  }

  _checkAnswerHandler(index) {
    this._callback.checkAnswer(this._variants[index]);
  }

  checkAnswer(callback) {
    this._callback.checkAnswer = callback;
    this.getElement().querySelectorAll('.question_painting_answers li').forEach((item, index) => {
      item.addEventListener('click', () => this._checkAnswerHandler(index));
    });
  }
}
