import Abstract from "./abstract.js";

const createStartPageMain = () => {
  return `<div class="start_page_main">
    <div class="start_page">
      <div class="start_page_type">
        <button class="artists" value="artists">
          <span><b>Artists</b> quiz</span>
        </button>
        <button class="pictures" value="pictures">
          <span><b>Pictires</b> quiz</span>
        </button>
      </div>
      <button class="start_page_setting" value="setting">Settings</button>
    </div>
  </div>`
}

export default class StartPageMain extends Abstract {
  constructor() {
    super();
    this._typeClickHandler = this._typeClickHandler.bind(this);
  }
  
  getTemplate() {
    return createStartPageMain();    
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.value);
  }

  setTypeChangeHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().querySelectorAll('.start_page_type button').forEach(item => {
      item.addEventListener('click', this._typeClickHandler)
    });
  }

}