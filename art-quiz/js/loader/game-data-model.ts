interface IGameData {
  questions: Array<IQuestion>
}

interface IQuestion {
  variants: Array<IAnswer>,
  correctAnswerIndex: number,
}

interface IAnswer{
  author: string,
  image?: Blob,
  imageUrl?:string,
  name: string,
  year: number,
}

interface IQuestionData{
  author: string,
  category: string,
  imageNum?: string,
  name: string,
  year: string,
}

//все картинки для одной категории 
/*
class GameDataModel implements IGameData {
  public questions: Array<IQuestion>;

  constructor() {   
  }  
  async buildFromJson(data:IQuestionData[], category:number) {
    const categoryQuestionsData = data.slice(category * 10, 10);
    
    const categoryQuestions: Array<IQuestion> = [];

    for (let i = 0; i < categoryQuestionsData.length; i++){
      const item = categoryQuestionsData[i];
      const loadResponse = await fetch(`./assets/img/paintings/${item.imageNum}.jpg`);
      const imgBlob = await loadResponse.blob();

      //закинуть все варианты в variants, индекс правильного ответа в correctAnswerIndex
      const question: IQuestion = {
        variants: [],
        correctAnswerIndex: 0,
      }
      categoryQuestions.push(question)
    }
    this.questions = categoryQuestions;
  }
}
*/
//URL.createObjectURL(blob);
 //картинки для одного вопроса 
export default class GameDataModel implements IGameData {
  public questions: Array<IQuestion>;
  private _data: IQuestionData[];
  private _category: number;
  private cache: Map<string, Blob> = new Map();

  constructor(data: IQuestionData[], category: number) {
    const categoryQuestionsData = data.slice(category * 10, 10);
    const categoryQuestions: Array<IQuestion> = [];
    console.log(data, category)
    for (let i = 0; i < categoryQuestionsData.length; i++) {
      const item = categoryQuestionsData[i];
     /* const variant: IAnswer = {
        imageUrl: `./assets/img/paintings/${item.imageNum}.jpg`
        //тут сформировать всю другую инфу по вариантам ответа?
      }*/
      const question: IQuestion = {
        variants: [],//тут 4 варианта для ответа
        correctAnswerIndex: 0,//индекс правильного ответа
      }
      categoryQuestions.push(question)
    }
    this.questions = categoryQuestions;
  }

  async preLoad(index: number) {
    const question = this.questions[index];
    for (let i = 0; i < this.questions.length; i++){
      const imgBlob = await this.loadImage(question.variants[i].imageUrl);
      question.variants[i].image = imgBlob;
    }    
  }
  async loadImage(imageNum: string) {
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