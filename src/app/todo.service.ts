import {Injectable} from '@angular/core';

type Todo = {
    value: string
    id: number
    isChecked: boolean
}

@Injectable({
  providedIn: 'root'
})


export class TodoService {
  todos = [
    {
      value: "my first todo",
      id: Math.ceil(Math.random() * 10000000),
      isChecked: false
    },
    {
      value: "my second todo",
      id: Math.ceil(Math.random() * 10000000),
      isChecked: false
    },
  ];

  getTodos(): Array<Todo> {
    console.log(this.todos);
    
    return this.todos;
  }

  getTodo(id: number) {
    return this.todos[this.todos.findIndex((todo) => todo.id = id)];
  }

  addTodo(value: string) {
    this.todos.push({
        value: value,
        id: Math.ceil(Math.random() * 10000000),
        isChecked: false
    })
  }

  updateTodo(todo: Todo) {
    let oldTodo = this.todos.findIndex((findableTodo) => findableTodo.id === todo.id);
    this.todos[oldTodo] = todo;
  }

  deleteTodo(todoId: number) {
    let todoIndex = this.todos.findIndex((findableTodo) => findableTodo.id === todoId)
    this.todos.splice(todoIndex, 1)
  }
}