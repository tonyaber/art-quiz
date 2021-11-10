import Abstract from "./abstract.js";

const createQuestionPaintingPageMain = (question, allQuestions) => {

  const wrongAuthors = new Array(240).fill(null)
    .map((item, index) => item = allQuestions[index].author).filter(item => item != question.author)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  wrongAuthors.push(question.author);

  const allAuthors = wrongAuthors.sort(() => Math.random() - 0.5);

  const authorsTemplate = () => {
    return allAuthors.map(item => item = `<li>${item}</li>`)
      .join('');
  }

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
    this._nextImageHandler = this._nextImageHandler.bind(this)
  }

  setQuestion(question) {
    this._question = question;
    console.log(this._question)
  }

  getTemplate() {
    return createQuestionPaintingPageMain(this._question, this._allQuestions)
  }
  _nextImageHandler(evt) {
    console.log(evt.target.textContent)
    this._callback.nextImage();
  }

  nextImage(callback) {
    this._callback.nextImage = callback;
    this.getElement().querySelectorAll('.question_painting_answers li').forEach(item => {
      item.addEventListener('click', this._nextImageHandler)
    })
  }
}