import { createElement } from "../utils.js";
import Abstract from "./abstract.js";

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
    this._timer = setInterval(this.setTimer, 1000);
  }
  
  setTimer() {
    this.getElement().remove();
    let time = this._value >= 10 ? this._value : '0' + this._value;
    this._element = createElement(this.getTemplate(time));
    this._container.append(this._element);
    this._value--;
    if (this._value < 0) {
      clearInterval(this._timer)
      this._callback.endInterval();
    }
  }

  endInterval(callback) {
    this._callback.endInterval = callback;    
  }
}