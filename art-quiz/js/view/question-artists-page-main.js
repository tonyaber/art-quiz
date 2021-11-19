import Abstract from "./abstract.js"

const createQuestionArtistsPageMain = (question, allQuestions, answers, countAnswers) => {
  const uniqueArrayAuthors = [];
  const uniqueName = [];
  allQuestions.slice().sort(() => Math.random() - 0.5).forEach(item => {
    if (item['author'] != question.author && !uniqueName.includes(item['author'])) {
      uniqueArrayAuthors.push(item);
      uniqueName.push(item['author']);
    }
  })
  
  const wrongAnswers = uniqueArrayAuthors.slice(0, 3);
  wrongAnswers.push(question);
  const allAnswers = wrongAnswers.sort(() => Math.random() - 0.5);

  const createQuestionsTemplate = (item) => {
    return `<li>
              <img src="./assets/img/paintings/${item.imageNum}.jpg"
              alt="${item.imageNum}">
            </li>`
  }

  const imageTemplate = allAnswers.map(item => createQuestionsTemplate(item)).join('');
  
  const createAnswersTemplate = (check) => {
    return `<li class="${check ? 'true' : 'false'}"></li>`
  }

  const answersTemplate = new Array(10).fill(null)
    .map((item, index) => item = (index < countAnswers) ? createAnswersTemplate(answers[index]) : '<li></li>')
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
      </div`
}

export default class QuestionArtistsMain extends Abstract{
  constructor(question, allQuestions, answers, index) {
    super();
    this._question = question;
    this._allQuestions = allQuestions;
    this._answers = answers;
    this._index = index;
    this._checkAnswerHandler = this._checkAnswerHandler.bind(this);

  }

  getTemplate() {
    console.log(this._answers)
    return createQuestionArtistsPageMain(this._question, this._allQuestions, this._answers, this._index);
    
  }

  _checkAnswerHandler(evt) {
    this._callback.checkAnswer(evt.target.alt);
  }

  checkAnswer(callback) {
    this._callback.checkAnswer = callback;
    this.getElement().querySelectorAll('.question li').forEach(item => {
      item.addEventListener('click', this._checkAnswerHandler)
    })
  }
}