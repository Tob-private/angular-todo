import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { type Todo } from "./todo.types";
import { TodoService } from './todo.service';

@Component({
    standalone: true,
    selector: 'app-todo',
    styles: `
        .strikethrough {
            text-decoration: line-through;
        }

        .removeTodoText {
            color: red;
        }
`,
    template: `
        <li 
        (click)="updateTodoStatus(todo)" 
        [class.strikethrough]="todo.isChecked">
            {{ todo.value }}
        </li>
    
        <span 
        class="removeTodoText" 
        (click)="todoService.deleteTodo(todo.id)">
            Remove todo
        </span>
    `,
})
export class TodoComponent {
    @Input() todo: any;
    @Output() updateTodoListEvent = new EventEmitter<string>();

    todoService = inject(TodoService);

    updateTodoStatus(todo: Todo) {
        const updatedTodo = {
            ...todo,
            isChecked: todo.isChecked ? false : true
        }
        this.todoService.updateTodo(updatedTodo);

        // Update todos list by emiting update event
        this.updateTodoListEvent.emit("update");

    }
}
