export default class SettingModel {
  constructor() {
    this._settings = {
      language: 'en',
      music: {
        value: 0.5,
        check: false,
      },
      volume: {
        value: 0.5,
        check: false,
      },
      time: {
        value: 10,
        check: false,
      },
    };
    this._updateSettings();
    this._saveSettings();
  }

  getSetting(key, value) {
    return this._settings[key][value];
  }

  getAllSetting() {
    return this._settings;
  }

  getLanguage() {
    return this._settings.language;
  }

  setSetting(key, value, check = this._settings[key].check) {
    this._settings[key].value = value;
    this._settings[key].check = check;
  }

  setLanguage(value) {
    this._settings.language = value;
  }

  _updateSettings() {
    if (localStorage.getItem('tonyaber-settings')) {
      this._settings = JSON.parse(localStorage.getItem('tonyaber-settings'));
    }
  }

  _saveSettings() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('tonyaber-settings', JSON.stringify(this._settings));
    });
  }
}
