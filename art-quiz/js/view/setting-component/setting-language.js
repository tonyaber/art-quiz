import { LANGUAGE } from "../../const.js";
import Control from "../control.js";
import SettingLanguageSelect from "./setting-language-select.js";

export default class SettingLanguage extends Control {
  constructor(parentNode, settingModel, language) {
    super(parentNode);
    this.settingModel = settingModel;
    this._language = language;

    const languageContainer = new Control(this.node, 'div', 'language', '');

    const languageIcon = new Control(languageContainer.node, 'img', '', '');
    languageIcon.node.src = "./assets/svg/language.svg";
    languageIcon.node.alt = "language icon";

    const languageSelect = new SettingLanguageSelect(languageContainer.node, this.settingModel, this._language);

    const languageTitle = new Control(languageContainer.node, 'h3', '', LANGUAGE[this._language]['language']);

  }
}
