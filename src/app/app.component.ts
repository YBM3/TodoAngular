import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClientModule } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/core';
import { TodoService } from './services/todo.service';

interface Todo {
  title: string;
  date?: Date;
  done?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoListComponent, 
    CalendarComponent,
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FullCalendarModule, 
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'testTasNG';
  events: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events
  };

  constructor(private http: HttpClient, private todoService: TodoService, private cdr: ChangeDetectorRef) {} 

  ngOnInit() {
    this.todoService.todos$.subscribe((todos: Todo[]) => {
      this.events = todos.map((todo: Todo) => ({
        title: todo.title,
        date: todo.date?.toISOString(),
        color: todo.done ? 'green' : undefined
      }));
      this.calendarOptions.events = this.events;
      this.cdr.detectChanges();
    });
  }
  
}