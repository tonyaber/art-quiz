import Control from "../control.js";

export default class SettingVolumeBar extends Control {
  constructor(parentNode, settingModel, check) {
    super(parentNode);
    this._settingModel = settingModel;
    this._check = check;
   
    this._value = this._settingModel.getSetting('volume', 'value');

    const volumeBar = new Control(this.node, 'input');
    volumeBar.node.type = "range";
    volumeBar.node.min = 0;
    volumeBar.node.max = 1;
    volumeBar.node.step = 0.11;
    volumeBar.node.value = this._value;
    volumeBar.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${this._value*100}%, rgb(247,247,247) ${this._value*100}%, rgb(247,247,247) 100%)`;
    
    volumeBar.node.oninput = (evt) => {
      volumeBar.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${evt.target.value*100}%, rgb(247,247,247) ${evt.target.value*100}%, rgb(247,247,247) 100%)`;
      this._settingModel.setSetting('volume', evt.target.value);
    }
  }
}