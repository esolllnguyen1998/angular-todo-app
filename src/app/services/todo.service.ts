import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos() {
    let url = "https://jsonplaceholder.typicode.com/todos";
    return this.http.get(url);
  }
}
