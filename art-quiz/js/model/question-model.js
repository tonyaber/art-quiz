import { COUNT_QUESTION, LANGUAGE } from '../const.js';

export default class QuestionModel {
  constructor(language) {
    this._language = language;
    this._allQuestions = [];
    this._categories = [];
    this._type = '';
    this._indexCategory = 0;
    this._answers = {
      artists: {},
      pictures: {},
    };
    this._checkAnswerForCategory = {
      artists: {},
      pictures: {},
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
      new Array(12).fill(null).map((item, index) => index).forEach((item) => {
        this._answers.artists[item] = { isPlay: false };
        for (let i = 0; i < 10; i++) {
          this._answers.artists[item][i] = false;
        }
      });
      new Array(12).fill(null).map((item, index) => index).forEach((item) => {
        this._answers.pictures[item] = { isPlay: false };
        for (let i = 0; i < 10; i++) {
          this._answers.pictures[item][i] = false;
        }
      });
    }
  }

  changeLanguage(language) {
    this._language = language;
  }

  buildAllQuestions() {
    return fetch(LANGUAGE[this._language].json)
      .then((json) => json.json())
      .then((questions) => {
        this._allQuestions = questions;
        return questions;
      });
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
      case 'pictures':
        this._categories = this._allQuestions.slice(120);
        break;
      default:
        throw new Error('Wrong type');
    }
    return this._categories;
  }

  getCategoriesQuestions(index) {
    this._indexCategory = index;
    let newIndex = index;
    switch (this._type) {
      case 'artists':
        break;
      case 'pictures':
        newIndex += 12;
        break;
      default:
        throw new Error('Wrong type');
    }
    return this._allQuestions.slice(newIndex * COUNT_QUESTION, newIndex * COUNT_QUESTION + COUNT_QUESTION);
  }

  setCheckAnswer(index, check) {
    this._answers[this._type][this._indexCategory][index] = check;
    this._answers[this._type][this._indexCategory].isPlay = true;
  }

  getCheckAnswer(index) {
    return this._answers[this._type][index];
  }

  getCheckAnswerForCategory() {
    for (const key of Object.entries(this._answers[this._type])) {
      if (!key[1].isPlay) {
        this._checkAnswerForCategory[this._type][key[0]] = {
          isPlay: false,
          count: 0,
        };
      } else {
        const count = Object.values(key[1]).filter((item) => item).length - 1;
        this._checkAnswerForCategory[this._type][key[0]] = {
          isPlay: true,
          count,
        };
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
