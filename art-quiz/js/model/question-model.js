import { COUNT_CATEGORIES, COUNT_QUESTION, LANGUAGE } from "../const.js";

export default class QuestionModel {
  constructor(language) {
    this._language = language;
    this._allQuestions = [];
    this._categories = [];
    this._type = '';
    this._indexCategory = 0;
    this._answers = {
      'artists': {},
      'pictures': {}
    };
    this._checkAnswerForCategory = {
      'artists': {},
      'pictures': {}
    };
    this._answerForCategory = {};
    this._cache = new Map();
    this._createAnswer();
    this._saveAnswers();
  }

  _createAnswer() {
    if (localStorage.getItem('tonyaber-answers')) {
      this._answers = JSON.parse(localStorage.getItem('tonyaber-answers'));
    } else {
      for (let key in this._answers) {
        new Array(COUNT_CATEGORIES).fill(null).map((item, index) => item = index).forEach(item => {
          this._answers[key][item] = { 'isPlay': false };
          for (let i = 0; i < COUNT_QUESTION; i++) {
            this._answers[key][item][i] = false;
          }
        });
      }
    }
  }

  changeLanguage(language) {
    this._language = language;
  }

  buildAllQuestions() {
    fetch(LANGUAGE[this._language]['json'])
      .then((json) => json.json())
      .then((questions) => this._allQuestions = questions)
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

  async getCategoryPhoto() {
    const categoryPhoto = [];
    for (let i = 0; i < COUNT_CATEGORIES; i++) {
      const num = this._categories[i * COUNT_QUESTION]['imageNum'];
      const imgBlob = await this.loadImage(num);
      categoryPhoto.push(imgBlob)
    }
    return categoryPhoto
  }

  async loadImage(imageNum) {
    if (this._cache.has(imageNum)) {
      return this._cache.get(imageNum);
    } else {
      const loadResponse = await fetch(`./assets/img/paintings/${imageNum}.jpg`);
      const imgBlob = await loadResponse.blob();
      this._cache.set(imageNum, imgBlob);
      return imgBlob;
    }
  }
  getCategoriesQuestions(index) {
    this._indexCategory = index
    switch (this._type) {
      case 'artists':
        index = index;
        break;
      default:
        index += 12;
        break;
    }
    return this._allQuestions.slice(index * COUNT_QUESTION, index * COUNT_QUESTION + COUNT_QUESTION)
  }

  setCheckAnswer(index, check) {
    this._answers[this._type][this._indexCategory][index] = check;
    this._answers[this._type][this._indexCategory]['isPlay'] = true;
  }

  getCheckAnswer(index) {
    return this._answers[this._type][index];
  }

  getCheckAnswerForCategory() {
    for (let key of Object.entries(this._answers[this._type])) {
      if (!key[1]['isPlay']) {
        this._checkAnswerForCategory[this._type][key[0]] = {
          'isPlay': false,
          'count': 0
        }
      } else {
        const count = Object.values(key[1]).filter(item => item).length - 1;
        this._checkAnswerForCategory[this._type][key[0]] = {
          'isPlay': true,
          'count': count
        }
      }
    }
    return this._checkAnswerForCategory[this._type];
  }
  _saveAnswers() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('tonyaber-answers', JSON.stringify(this._answers));
    });
  }
}