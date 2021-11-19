import Abstract from "./abstract.js";
import Control from "./control.js";
import SettingVolume from "./setting-component/setting-volume.js";
import { renderElement } from "../utils.js";
import SettingMusic from "./setting-component/setting-music.js";
import SettingTime from "./setting-component/setting-time.js";
import SettingLanguage from "./setting-component/setting-language.js";
import { LANGUAGE } from "../const.js";
const createSetting = (language) => {
  return `<div class="settings-main">
        <h2>${LANGUAGE[language]['settings']}</h2>
        <div class="settings-container">      
        </div>
        <button>${LANGUAGE[language]['save']}</button>
      </div>`;
}

export default class SettingPage extends Abstract {
  constructor(settingModel, language) {
    super();
    this.settingModel = settingModel;
    this._language = language;
  
    this._saveSettingHandler = this._saveSettingHandler.bind(this);
  }
  init() {
    const container = this.getElement().querySelector('.settings-container');
    
    this._volumeComponent = new SettingVolume(container, this.settingModel, this._language);
    this._musicComponent = new SettingMusic(container, this.settingModel, this._language);
    this._timeComponent = new SettingTime(container, this.settingModel, this._language);
    this._languageComponent = new SettingLanguage(container, this.settingModel, this._language);
  }
  
  getTemplate() {
    return createSetting(this._language);
  }

  _saveSettingHandler(evt) {
    evt.preventDefault();
    this._callback.saveSetting();
  }

  saveSetting(callback) {
    this._callback.saveSetting = callback;
    this.getElement().querySelector('button').addEventListener('click', this._saveSettingHandler);
  }

}