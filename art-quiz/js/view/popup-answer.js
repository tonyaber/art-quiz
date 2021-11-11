import Abstract from "./abstract.js"

const createPopup = (question, check) => {
  return `<div class="popup">
      <div class="modal_answer">
        <img class="check" src="./assets/svg/${check?'correct_answer':'wrong_answer'}.svg" alt="check">
        <img class="painting" src="./assets/img/paintings/${question.imageNum}.jpg" alt="answer">
        <div class="answer">
          <span>${question.name}</span>
          <span>${question.author}</span>
          <span>${question.year}</span>
          <button>Next</button>
        </div>
      </div>
    </div>`
}

export default class PopupAnswer extends Abstract {
  constructor(question, check) {
    super();
    this._question = question;
    this._check = check;
    this._nextImageHandler = this._nextImageHandler.bind(this);
  }

  destroy() {
    this.getElement().remove();
    this._element = null;
  }
  
  getTemplate() {
    return createPopup(this._question, this._check);
  }

  _nextImageHandler(evt) {
    evt.preventDefault();
    this._callback.nextImage();
  }

  nextImage(callback) {
    this._callback.nextImage = callback;
    this.getElement().querySelector('button').addEventListener('click', this._nextImageHandler);
  }


}