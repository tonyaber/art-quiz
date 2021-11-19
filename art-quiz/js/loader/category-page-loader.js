export default class CategoryPageLoader {
  constructor(data, type) {
    const questions = [];
    this._data = data;
    this._category = type;
    this._cache = new Map();
    const categoryQuestionsData = data.slice(category * 10, 10);
    const categoryQuestions = [];
    for (let i = 0; i < categoryQuestionsData.length; i++) {
      const item = categoryQuestionsData[i];
      /* const variant: IAnswer = {
         imageUrl: `./assets/img/paintings/${item.imageNum}.jpg`
         //тут сформировать всю другую инфу по вариантам ответа?
       }*/
      const question = {
        variants: [],//тут 4 варианта для ответа
        correctAnswerIndex: 0,//индекс правильного ответа
      }
      categoryQuestions.push(question)
    }
    this.questions = categoryQuestions;
  }

  async preLoad(index) {
    const question = this.questions[index];
    for (let i = 0; i < this.questions.length; i++) {
      const imgBlob = await this.loadImage(question.variants[i].imageUrl);
      question.variants[i].image = imgBlob;
    }
  }
  async loadImage(imageNum) {
    if (this.cache.has(imageNum)) {
      return this.cache.get(imageNum);
    } else {
      const loadResponse = await fetch(`./assets/img/paintings/${imageNum}.jpg`);
      const imgBlob = await loadResponse.blob();
      this.cache.set(imageNum, imgBlob);
      return imgBlob;
    }
  }
}