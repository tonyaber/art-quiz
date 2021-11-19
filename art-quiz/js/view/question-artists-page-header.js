import Abstract from "./abstract.js";

const createQuestionArtistsPageHeader = () => { 
  return `<div class="question_header">
    <h1>ArtQuiz</h1>
    <div class="question_header_container">
      <img src="./assets/img/logo.png" alt="logo">
      <h2>Who is the author of this picture ?</h2>
      <div class="time">       
      </div>
    </div>
  </div>`
}

export default class QuestionArtistsHeader extends Abstract {
  constructor() {
    super();    
  
    this._backToMainHandler = this._backToMainHandler.bind(this);
  }

  getTemplate() {
    return createQuestionArtistsPageHeader();
  }
  
  getTimeContainer() {
    return this.getElement().querySelector('.time')
  }


  _showSettingHandler(evt) {
    evt.preventDefault();
    this._callback.setting()
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