import Abstract from "./abstract.js";
import { LANGUAGE } from "../const.js";

const createStartPageMain = (language) => {
  console.log(language)
  return `<div class="start_page_main">
    <div class="start_page">
      <div class="start_page_type">
        <button class="artists" value="artists">
          <span><b>${LANGUAGE[language]['artists']}</b> ${LANGUAGE[language]['quiz']}</span>
        </button>
        <button class="pictures" value="pictures">
          <span><b>${LANGUAGE[language]['pictures']}</b> ${LANGUAGE[language]['quiz']}</span>
        </button>
      </div>
      <button class="start_page_setting" value="setting"><img src="./assets/svg/setting.svg">${LANGUAGE[language]['settings']}</button>
    </div>
  </div>`
}

export default class StartPageMain extends Abstract {
  constructor(language) {
    super();
    this._language = language;
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._showSettingHandler = this._showSettingHandler.bind(this);
  }
  
  getTemplate() {
    return createStartPageMain(this._language);    
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.value);
  }

  _showSettingHandler(evt) {
    evt.preventDefault();
    this._callback.setting()
  }

  setTypeChangeHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().querySelectorAll('.start_page_type button').forEach(item => {
      item.addEventListener('click', this._typeClickHandler)
    });
  }

  showSetting(callback) {
    this._callback.setting = callback;
    this.getElement().querySelector('.start_page_setting').addEventListener('click', this._showSettingHandler);
  }

}