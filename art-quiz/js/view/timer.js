import { createElement } from "../utils.js";
import Abstract from "./abstract.js";

const TIME_OF_CHANGE_TIMER = 1000;

const createTimer = (value) => {
  return `<img src="./assets/svg/timer.svg" alt="timer icon">
      <span>00:${value}</span>`
}

export default class Timer extends Abstract{
  constructor(container, value) {
    super();
    this._container = container;
    this._value = value;
    this.setTimer = this.setTimer.bind(this);
  }

  getTemplate(value){
    return createTimer(value)
  }

  render() {
    this._timer = setInterval(this.setTimer, TIME_OF_CHANGE_TIMER);
  }

  setTimer() {
    this.getElement().remove();
    let time = this._value >= 10 ? this._value : '0' + this._value;
    this._element = createElement(this.getTemplate(time));
    this._container.append(this._element);
    this._value--;
    if (this._value < 0) {
      this.stopInterval()
      this._callback.endInterval();
    }
  }

  stopInterval() {
    clearInterval(this._timer)
  }

  endInterval(callback) {
    this._callback.endInterval = callback;    
  }
}