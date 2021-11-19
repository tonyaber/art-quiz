import Control from "../control.js";
import SettingVolumeBar from "./setting-volume-bar.js";

export default class SettingVolume extends Control{
  constructor(parentNode, settingModel) {
    super(parentNode);
    this.settingModel = settingModel;

    this.check = this.settingModel.getSetting('volume', 'check');
    this._value = this.settingModel.getSetting('volume', 'value');

    const volumeContainer = new Control(this.node, 'div', 'volume sound', '');
    const volumeIcon = new Control(volumeContainer.node, 'img','','');
    volumeIcon.node.src = "./assets/svg/sound.svg";
    volumeIcon.node.alt = "Volume icon";

    const volumeCheckBox = new Control(volumeContainer.node, 'input', '', '');
    volumeCheckBox.node.type = "checkbox";
    volumeCheckBox.node.checked = this.check;

    const volumeBar = new SettingVolumeBar(volumeContainer.node, this.settingModel, this.check);

    const volumeTitle = new Control(volumeContainer.node, 'h3', '', 'Volume');

    volumeCheckBox.node.onchange = (evt) => {
      this.settingModel.setSetting('volume', this._value, evt.target.checked);
    }

  }
}