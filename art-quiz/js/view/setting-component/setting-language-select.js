import { LANGUAGE } from '../../const.js';
import Control from '../control.js';

export default class SettingLanguageSelect extends Control {
  constructor(parentNode, settingModel, language) {
    super(parentNode);
    this._settingModel = settingModel;
    this._language = language;
    this._value = this._settingModel.getLanguage();

    const languageSelect = new Control(this.node, 'select', '', '');

    const englishOption = new Control(languageSelect.node, 'option', '', LANGUAGE[this._language].english);
    englishOption.node.value = 'en';

    const russianOption = new Control(languageSelect.node, 'option', '', LANGUAGE[this._language].russian);
    russianOption.node.value = 'ru';

    switch (this._value) {
      case 'en':
        englishOption.node.selected = 'true';
        break;
      default:
        russianOption.node.selected = 'true';
    }

    languageSelect.node.onchange = (evt) => {
      this._settingModel.setLanguage(evt.target.value);
    };
  }
}
