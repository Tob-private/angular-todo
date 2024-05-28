import {Component, inject} from '@angular/core';
import {TodoService} from './todo.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Todo = {
  value: string
  id: number
  isChecked: boolean
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  styles: `
  .strikethrough {
    text-decoration: line-through;
  }

  .removeTodoText {
      color: red;
  }
`,
  template: `
    <ol>
      @for(todo of todos; track todo.id) {
        <li (click)="updateTodoStatus(todo)" [class.strikethrough]="todo.isChecked">{{ todo.value }}</li><span class="removeTodoText" (click)="todoService.deleteTodo(todo.id)">Remove todo</span>
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

  updateTodoStatus(todo: Todo) {
    const updatedTodo = {
      ...todo,
      isChecked: todo.isChecked ? false : true
    }
    this.todoService.updateTodo(updatedTodo);

    // Update todos list
    this.todos = this.todoService.getTodos();
  }
  
  onTodoSubmit() {
    if (this.todoForm.value.newTodo) {
      this.todoService.addTodo(this.todoForm.value.newTodo)
    } else {
      alert("You need to enter a value to create a new todo")
    }
  }
}
