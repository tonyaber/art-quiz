import { COUNT_CATEGORIES, COUNT_QUESTION } from "../const.js";
export default class PhotoLoader{
  constructor() {
    this._allQuestions = [];
    this._cache = new Map();
  }

  setQuestion(questions) {
    this._allQuestions = questions;
  }

  setType(type) {
    this._type = type;
  }

  async getPhotoForArtists(indexCategory, indexQuestion) {
    const num = this._allQuestions[indexCategory*10 + indexQuestion]['imageNum'];
    const imgBlob = await this.loadImage(num);
    return imgBlob;    
  }

  async getPhotoForPaintings(photos) {
    const photosBlob = [];
    for (let i = 0; i < photos.length; i++) {
      const num = photos[i]['imageNum'];
      const imgBlob = await this.loadImage(num);
      photosBlob.push(imgBlob);
    }
    return photosBlob;
  }

  async getAllPhoto(questions) {
    const allPhoto = [];
    for (let i = 0; i < questions.length; i++){
      const num = questions[i]['imageNum'];
      const imgBlob = await this.loadImage(num);
      allPhoto.push(imgBlob);
    }
    return allPhoto;
  }

  async getCategoryPhoto() {
    const categoryPhotos = [];
    let typeCount = this._type == 'artists' ? 0 : 120;
    for (let i = 0; i < COUNT_CATEGORIES; i++) {
      const num = this._allQuestions[i*COUNT_QUESTION + typeCount]['imageNum'];
      
      const imgBlob = await this.loadImage(num);
      categoryPhotos.push(imgBlob);
    }
    return categoryPhotos;
  }

  async getPhotoForScore(indexCategory) {
    const scorePhotos = [];
    let typeCount = this._type == 'artists' ? 0 : 120;
    for (let i = 0; i < COUNT_QUESTION; i++) {
      const num = this._allQuestions[indexCategory * 10 + i + typeCount]['imageNum'];
      const imgBlob = await this.loadImage(num);
      scorePhotos.push(imgBlob);
    }
    return scorePhotos;
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
}