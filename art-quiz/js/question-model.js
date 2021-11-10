export default class QuestionModel{
  constructor() {
    this._allQuestions = [];
    this._categories = [];
    this._categoriesQuestions = [];
    this._question = {};
    this._type = '';
    this._indexCategoryStart = 0;
    this._getAllQuestions();
  }

  _getAllQuestions(){
    fetch('./js/data.json')
      .then((json) => json.json())
      .then((questions)=>this._allQuestions=questions)
  }

  getAllQuestions() {
    return this._allQuestions;
  }

  getCategories(type) {
    this._type = type;
    switch (this._type) {
      case 'artists':
        this._categories = this._allQuestions.slice(0, 120);
        break;
      default:
        this._categories = this._allQuestions.slice(120)
        break;
    }
    return this._categories;
  }

  getCategoriesQuestions(index) {
    switch (this._type) {
      case 'artists':
        this._indexCategoryStart = index;
        break;
      default:
        this._indexCategoryStart = index + 12;
        break;
    }
    return this._allQuestions.slice(this._indexCategoryStart * 10, this._indexCategoryStart * 10 + 10)
  }

}