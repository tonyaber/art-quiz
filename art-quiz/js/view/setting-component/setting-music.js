import Control from "../control.js";
import SettingMusicBar from "./setting-music-bar.js";


export default class SettingMusic extends Control {
  constructor(parentNode, settingModel) {
    super(parentNode);
    this.settingModel = settingModel;

    this._check = this.settingModel.getSetting('music', 'check');
    this._value = this.settingModel.getSetting('music', 'value');

    const musicContainer = new Control(this.node, 'div', 'music sound', '');
    const musicIcon = new Control(musicContainer.node, 'img', '', '');
    musicIcon.node.src = "./assets/svg/music.svg";
    musicIcon.node.alt = "music icon";

    const musicCheckBox = new Control(musicContainer.node, 'input', '', '');
    musicCheckBox.node.type = "checkbox";
    musicCheckBox.node.checked = this._check;

    const musicBar = new SettingMusicBar(musicContainer.node, this.settingModel, this.checked);

    const musicTitle = new Control(musicContainer.node, 'h3', '', 'Music');

    musicCheckBox.node.onchange = (evt) => {
      this.settingModel.setSetting('music', this._value, evt.target.checked);
    }

  }
}