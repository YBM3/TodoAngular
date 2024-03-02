import { Component } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent {
  newTodo: string = '';
  searchTerm: string = '';
  searchTerm$ = new BehaviorSubject<string>('');
  filteredTodos$;
  newTodoDate: string;
  originalTodo!: Todo;


  constructor(public todoService: TodoService) {
    this.newTodo = '';
    this.newTodoDate = new Date().toISOString().split('T')[0];
    this.filteredTodos$ = combineLatest([this.todoService.todos$, this.searchTerm$]).pipe(
      map(([todos, searchTerm]) => todos.filter(todo => todo.title.includes(searchTerm)))
    );
  }

  addTodo(date: string) {
    console.log(this.newTodo);
    if (this.newTodo) {
      this.todoService.addTodo(this.newTodo, date);
      this.newTodo = '';
    }
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  search() {
    this.searchTerm$.next(this.searchTerm); 
  }

  editTodo(todo: Todo) {
    this.originalTodo = { ...todo };
    todo.editing = true;
  }
  
  cancelEditing(todo: Todo) {
    Object.assign(todo, this.originalTodo);
    todo.editing = false;
  }
  
  saveTodo(todo: Todo) {
    todo.editing = false;
    this.todoService.updateTodo(todo);
  }

}
