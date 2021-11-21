import Abstract from './abstract.js';

const createFooter = () => `<a a href="https://rs.school/">
      <img src="./assets/svg/rs_school_js.svg">
    </a>
    <a href="https://github.com/tonyaber">Berchuk Antonina 2021</a>`;

export default class Footer extends Abstract {
  getTemplate() {
    return createFooter();
  }
}
