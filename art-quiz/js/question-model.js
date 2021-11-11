export default class QuestionModel{
  constructor() {
    this._allQuestions = [];
    this._categories = [];
    this._type = '';
    this._indexCategory = 0;
    this._answers = {};
    this._getAllQuestions();
    this._createAnswer();
  }

  _createAnswer() {
    new Array(24).fill(null).map((item, index) => item = index).forEach(item => {
      this._answers[item] = {};
    });
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
        this._indexCategory = index;
        break;
      default:
        this._indexCategory = index + 12;
        break;
    }
    return this._allQuestions.slice(this._indexCategory * 10, this._indexCategory * 10 + 10)
  }

  setCheckAnswer(index, check) {
    this._answers[this._indexCategory][index] = check;
  }

}