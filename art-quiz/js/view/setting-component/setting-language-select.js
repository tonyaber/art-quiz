import Control from "../control.js";

export default class SettingLanguageSelect extends Control {
  constructor(parentNode, settingModel) {
    super(parentNode);
    this._settingModel = settingModel;
    this._value = this._settingModel.getLanguage();

    const languageSelect = new Control(this.node, 'select', '', '');

    const englishOption = new Control(languageSelect.node, 'option', '', 'English');
    englishOption.node.value = 'en';

    const russianOption = new Control(languageSelect.node, 'option', '', 'Russian');
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
    }
  }
}