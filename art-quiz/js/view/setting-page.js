import Abstract from "./abstract.js";
const createSetting = () => {
  return ` <div class="settings-main">
        <h2>Settings</h2>
        <div class="settings-container">
          <div class="volume">
            <img src="./assets/svg/sound.svg" alt="volume sound">
            <input type="checkbox">
            <input type="range" min="0" max="100" value="50">
            <h3>Volume</h3>
          </div>
          <div class="music">
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
    super()
  }
  getTemplate() {
    return createSetting();
  }
}