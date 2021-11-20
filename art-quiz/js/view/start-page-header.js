import Abstract from './abstract.js';

const createStartPageHeader = () => `<div class="start_page_header">
    <h1>ArtQuiz</h1>
    <img src="./assets/img/logo.png" alt="logo">
  </div>`;

export default class StartPageHeader extends Abstract {
  getTemplate() {
    return createStartPageHeader();
  }
}
