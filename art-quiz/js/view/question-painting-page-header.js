import Abstract from "./abstract.js";

const createQuestionPaintingPageHeader = () => {
  return `<div class="question_header">
    <h1>ArtQuiz</h1>
    <div class="question_header_container">
      <img src="./assets/img/logo.png" alt="logo">
      <h2>Who is the author of this picture ?</h2>
      <div class="time">
        <span>03:59</span>
      </div>
    </div>
  </div>`
}

export default class QuestionPaintingHeader extends Abstract {
  getTemplate() {
    return createQuestionPaintingPageHeader(this._question, this._allQuestions);
  }
}