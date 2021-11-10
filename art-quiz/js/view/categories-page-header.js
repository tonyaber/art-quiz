import Abstract from "./abstract.js";
const createCategoriesPageHeader = () => {
  return `<div class="categories_header">
  <h1>ArtQuiz</h1>
  <img src="./assets/img/logo.png" alt="logo">
</div>`
}

export default class CategoriesPageHeader extends Abstract {
  getTemplate() {
    return createCategoriesPageHeader();
  }
}