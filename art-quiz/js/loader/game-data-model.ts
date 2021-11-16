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

//https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings/number.jpg
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
      const loadResponse = await fetch(`https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings/${item.imageNum}.jpg`);
      const imgBlob = await loadResponse.blob();
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

class GameDataModel implements IGameData {
  public questions: Array<IQuestion>;
  private _data: IQuestionData[];
  private _category: number;
  private cache: Map<string, Blob> = new Map();

  constructor(data: IQuestionData[], category: number) {
    const categoryQuestionsData = data.slice(category * 10, 10);
    const categoryQuestions: Array<IQuestion> = [];
    for (let i = 0; i < categoryQuestionsData.length; i++) {
      const item = categoryQuestionsData[i];
      /*const variant: IAnswer = {
        imageUrl: `https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings/${item.imageNum}.jpg`
      }*/
      const question: IQuestion = {
        variants: [],
        correctAnswerIndex: 0,
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
      const loadResponse = await fetch(`https://raw.githubusercontent.com/tonyaber/pictures/main/art-quiz/paintings/${imageNum}.jpg`);
      const imgBlob = await loadResponse.blob();
      this.cache.set(imageNum, imgBlob);
      return imgBlob;
    }    
  }
}