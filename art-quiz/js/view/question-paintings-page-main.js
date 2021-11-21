import { COUNT_QUESTION } from '../const.js';
import Abstract from './abstract.js';

const createQuestionPaintingsPageMain = (variants, answers, countAnswers, photos) => {
  const createQuestionsTemplate = (item, index) => {
    const srcImage = URL.createObjectURL(photos[index]);

    return `<li>
              <img src="${srcImage}"
              alt="${item.imageNum}">
            </li>`;
  };

  const imageTemplate = variants.map((item, index) => createQuestionsTemplate(item, index)).join('');

  const createAnswersTemplate = (check) => `<li class="${check ? 'true' : 'false'}"></li>`;

  const answersTemplate = new Array(COUNT_QUESTION).fill(null)
    .map((item, index) => ((index < countAnswers) ? createAnswersTemplate(answers[index]) : '<li></li>'))
    .join('');

  return `<div class="question_main">
        <div class="question_artist_image">
          <ul class="question">
            ${imageTemplate}
          </ul>
          <ul class="answers">
           ${answersTemplate}
          </ul>
        </div>
      </div`;
};

export default class QuestionPaintingsMain extends Abstract {
  constructor(variants, answers, index, photos) {
    super();
    this._variants = variants;
    this._answers = answers;
    this._index = index;
    this._photos = photos;
    this._checkAnswerHandler = this._checkAnswerHandler.bind(this);
  }

  getTemplate() {
    return createQuestionPaintingsPageMain(this._variants, this._answers, this._index, this._photos);
  }

  _checkAnswerHandler(index) {
    this._callback.checkAnswer(this._variants[index].imageNum);
  }

  checkAnswer(callback) {
    this._callback.checkAnswer = callback;
    this.getElement().querySelectorAll('.question li').forEach((item, index) => { 
      item.addEventListener('click', ()=>this._checkAnswerHandler(index));
    });
  }
}
