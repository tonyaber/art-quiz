import Control from '../control.js';

export default class TimeVolumeBar extends Control {
  constructor(parentNode, settingModel, check) {
    super(parentNode);
    this._settingModel = settingModel;
    this._check = check;
    this._value = this._settingModel.getSetting('time', 'value');

    const timeBar = new Control(this.node, 'input');
    timeBar.node.type = 'range';
    timeBar.node.min = 5;
    timeBar.node.max = 30;
    timeBar.node.step = 5;
    timeBar.node.value = this._value;
    timeBar.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${((this._value - 5) * 20) / 5}%, rgb(247,247,247) ${((this._value - 5) * 20) / 5}%, rgb(247,247,247) 100%)`;

    const timeSpan = new Control(this.node, 'span', '', this._value);

    timeBar.node.oninput = (evt) => {
      timeBar.node.style.background = `linear-gradient(to right, #660033 0%, #660033 ${((evt.target.value - 5) * 20) / 5}%, rgb(247,247,247) ${((evt.target.value - 5) * 20) / 5}%, rgb(247,247,247) 100%)`;
      timeSpan.node.textContent = evt.target.value;
      this._settingModel.setSetting('time', evt.target.value, this._check);
    };
  }
}
