import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {
  public todoState = signal<Array<Todo>>([]);
  public updateTodo({id, title, description, done}: Todo): void {
    if((title && id && description !== null) || undefined) {
      this.todoState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
        }
      });
      this.saveTodoInLocalStorage();

    }
  }

  public saveTodoInLocalStorage(): void {
    const todos = JSON.stringify(this.todoState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);

  }
}


