import { Answer } from "./answer";

export class Question {
  question: string = '';
  answerList!: Answer[];

  constructor(question: string, answerList: Answer[]){
    this.question = question;
    this.answerList = answerList;
  }
}
