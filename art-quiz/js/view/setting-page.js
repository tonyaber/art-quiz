import Abstract from "./abstract.js";
const createSetting = () => {
  return `<div class="settings-main">
        <h2>Settings</h2>
        <div class="settings-container">
          <div class="volume sound">
            <img src="./assets/svg/sound.svg" alt="volume sound">
            <input type="checkbox" >
            <input type="range" min="0" max="100" value="50">
            <h3>Volume</h3>
          </div>
          <div class="music sound">
            <img src="./assets/svg/music.svg" alt="volume music">
            <input type="checkbox">
            <input type="range" min="0" max="100" value="50">
            <h3>Music</h3>
          </div>
          <div class="time">
            <img src="./assets/svg/clock.svg" alt="clock">
            <input type="checkbox" >
            <label><input type="range" min="5" max="30" step="5" value="10"><span>10</span></label>
            <h3>Time</h3>
          </div>
          <div class="language">
            <img src="./assets/svg/language.svg" alt="language">
            <select>
              <option value="" disabled selected hidden>Select language</option>
              <option value="en">English</option>
              <option value="ru">Russian</option>
            </select>
            <h3>Language</h3>
          </div>
        </div>
        <button>Save</button>
      </div>`;
}


export default class SettingPage extends Abstract {
  constructor() {
    super();
    this._saveSettingHandler = this._saveSettingHandler.bind(this);
    this._changeInputSound();
    this._changeInputTime();

  }
  getTemplate() {
    return createSetting();
  }

  _saveSettingHandler(evt) {
    evt.preventDefault();
    this._callback.saveSetting();
  }

  saveSetting(callback) {
    this._callback.saveSetting = callback;
    this.getElement().querySelector('button').addEventListener('click', this._saveSettingHandler);
  }

  _changeInputSound() {
    this.getElement().querySelectorAll('.sound input[type=range]').forEach(item => {
      item.addEventListener('input', (evt) => {
        evt.target.style.background = `linear-gradient(to right, #660033 0%, #660033 ${evt.target.value}%, #E5E5E5 ${evt.target.value}%, #E5E5E5 100%)`
      })
    })
  }

  _changeInputTime() {
    this.getElement().querySelector('.time input[type=range]').addEventListener('input', (evt) => {
      const value = (evt.target.value - 5) * 20 / 5;
      evt.target.style.background = `linear-gradient(to right, #660033 0%, #660033 ${value}%, #E5E5E5 ${value}%, #E5E5E5 100%)`;
    })
  }



}