import Abstract from "./abstract.js";

const createQuestionArtistsPageHeader = (question) => {

  return `<div class="question_header">
    <h1>ArtQuiz</h1>
    <div class="question_header_container">
      <img src="./assets/img/logo.png" alt="logo">
      <h2>Какую с этих картин написал ${question.author}?</h2>
      <div class="time">
        <span>03:59</span>
      </div>
    </div>
  </div>`
}

export default class QuestionArtistsHeader extends Abstract {
  constructor(question) {
    super();
    this._question = question;
  }
  getTemplate() {
    return createQuestionArtistsPageHeader(this._question);
  }

  
}