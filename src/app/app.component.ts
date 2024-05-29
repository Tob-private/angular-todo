import {Component, inject} from '@angular/core';
import {TodoService} from './todo.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type Todo } from "./todo.types";
import { TodoComponent } from "./todo.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, TodoComponent],
  template: `
    <ol>
      @for(todo of todos; track todo.id) {
        <app-todo [todo]=todo (updateTodoListEvent)="this.todoService.getTodos()"/>
      }
    </ol>
    <form [formGroup]="todoForm" (ngSubmit)="onTodoSubmit()">
      <input type="text" formControlName="newTodo">
      <button type="submit">Add todo</button>
    </form>
`
})

export class TodosComponent {
  todoService = inject(TodoService);
  
  todos = this.todoService.getTodos();

  todoForm = new FormGroup( {
    newTodo: new FormControl('', [Validators.required, Validators.minLength(1)])
  })
  
  onTodoSubmit() {
    if (this.todoForm.value.newTodo) {
      this.todoService.addTodo(this.todoForm.value.newTodo)
    } else {
      alert("You need to enter a value to create a new todo")
    }
  }
}
