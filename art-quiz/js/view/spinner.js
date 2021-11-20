import Abstract from "./abstract.js"

const createSpinner = () => {
  return `<div class="spinner">
  <img src="./assets/svg/spinner.svg" alt="spinner">
  </div>`;
}

export default class Spinner extends Abstract{
  getTemplate() {
    return createSpinner();
  }
}