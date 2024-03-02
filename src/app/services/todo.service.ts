import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  title: string;
  done: boolean;
  editing?: boolean;
  date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([{title: 'Todo 1', done: false, date: new Date()}, {title: 'Todo 2', done: false, date: new Date()}]);
  todos$ = this._todos.asObservable();

  constructor() { }

  getTodos(): Todo[] {
    return this._todos.getValue();
  }

  addTodo(title: string, date: string) {
    this._todos.next([...this._todos.getValue(), {title, done: false, date: new Date(date)}]);
  }

  deleteTodo(todo: Todo) {
    this._todos.next(this._todos.getValue().filter(t => t !== todo));
  }

  updateTodo(updatedTodo: Todo) {
    const todos = this._todos.getValue();
    const index = todos.findIndex(todo => todo === updatedTodo);
    if (index !== -1) {
      const newTodos = [...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)];
      this._todos.next(newTodos);
    }
  }

  
}