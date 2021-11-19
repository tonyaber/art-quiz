export default class SettingModel {
  constructor() {
    this._settings = {
      'language': 'en',
      'music': {
        'value': 50,
        'check': false
      },
      'volume': {
        'value': 50,
        'check': false
      },
      'time': {
        'value': 10,
        'check': false}
    };
    this._updateSettings();
    this._saveSettings();
    console.log(this._settings['volume'])
  }

  getSetting(key, value) {
    return this._settings[key][value];
  }

  setSetting(key, value, check) {
    this._settings[key]['value'] = value;
    this._settings[key]['check'] = check;    
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