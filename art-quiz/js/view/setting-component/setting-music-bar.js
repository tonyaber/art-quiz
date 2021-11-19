import Control from "../control.js";

export default class MusicVolumeBar extends Control {
  constructor(parentNode, settingModel, check) {
    super(parentNode);
    this._settingModel = settingModel;
    this._check = check;
    this._value = this._settingModel.getSetting('music', 'value');

    const musicBar = new Control(this.node, 'input');
    musicBar.node.type = "range";
    musicBar.node.min = 0;
    musicBar.node.max = 100;
    musicBar.node.step = 1;
    musicBar.node.value = this._value;
    musicBar.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${this._value}%, rgb(247,247,247) ${this._value}%, rgb(247,247,247) 100%)`;

    musicBar.node.oninput = (evt) => {
      musicBar.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${evt.target.value}%, rgb(247,247,247) ${evt.target.value}%, rgb(247,247,247) 100%)`;
      this._settingModel.setSetting('music', evt.target.value, this._check);
    }
  }
}