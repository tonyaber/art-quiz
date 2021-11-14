import Abstract from "./abstract.js";

const createQuestionPaintingPageMain = (question, allQuestions) => {
  const uniqueAuthors = [...new Set(allQuestions.map(item => item.author))]
  
  const wrongAuthors = uniqueAuthors.filter(item => item != question.author)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  wrongAuthors.push(question.author);

  const allAuthors = wrongAuthors.sort(() => Math.random() - 0.5);

  const authorsTemplate = () => {
    return allAuthors.map(item => item = `<li>${item}</li>`)
      .join('');
  }

  return `<div class="question_main">
    <div class="question_painting_image">
      <img src="https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings_full/${question.imageNum}full.jpg">
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
        ${authorsTemplate()}
      </ul>
    </div>
  </div>`
}

export default class QuestionPaintingMain extends Abstract {
  constructor(question, allQuestions) {
    super();
    this._question = question;
    this._allQuestions = allQuestions;
    this._checkAnswerHandler = this._checkAnswerHandler.bind(this)
  }

  setQuestion(question) {
    this._question = question;
    console.log(this._question)
  }

  getTemplate() {
    return createQuestionPaintingPageMain(this._question, this._allQuestions)
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