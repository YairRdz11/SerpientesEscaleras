import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  questionList!: Question[];
  url: string = 'assets/test.json';

  constructor(private _httpService: HttpClient) { }

  getList(): Observable<Question[]>{
    return this._httpService.get<Question[]>(this.url);
  }
}
