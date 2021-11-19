import Control from "../control.js";
import SettingTimeBar from "./setting-time-bar.js";


export default class SettingTime extends Control {
  constructor(parentNode, settingModel) {
    super(parentNode);
    this.settingModel = settingModel;

    this._check = this.settingModel.getSetting('time', 'check');
    this._value = this.settingModel.getSetting('time', 'value');

    const timeContainer = new Control(this.node, 'div', 'time sound', '');
    const timeIcon = new Control(timeContainer.node, 'img', '', '');
    timeIcon.node.src = "./assets/svg/clock.svg";
    timeIcon.node.alt = "time icon";

    

    const timeCheckBox = new Control(timeContainer.node, 'input', '', '');
    timeCheckBox.node.type = "checkbox";
    timeCheckBox.node.checked = this._check;

    const timeLabel = new Control(timeContainer.node, 'label', '', '');

    const timeBar = new SettingTimeBar(timeLabel.node, this.settingModel, this.checked);

    const timeTitle = new Control(timeContainer.node, 'h3', '', 'Time');

    timeCheckBox.node.onchange = (evt) => {
      this.settingModel.setSetting('time', this._value, evt.target.checked);
    }

  }
}