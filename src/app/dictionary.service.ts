import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Word} from "./word";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private baseUrl = 'https://micronaut-heroku-dict.herokuapp.com/dictionary';

  constructor(private http: HttpClient) {
  }

  getDictionary(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  
  saveWord(word: Word) {
    return this.http.post(`${this.baseUrl}`, word)
  }

  updateWord(actualWord: string, updatedWord: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${updatedWord}`, actualWord);
  }

  deleteWord(word: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${word}`);
  }
}