import { Component, computed, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from './../../services/todo-signals.service';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule

  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit {

  private todoSignalsService = inject(TodoSignalsService);
  private todoSignal = this.todoSignalsService.todoState;
  public todosList = computed(() => this.todoSignal());


  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }
  private getTodosInLocalStorage(): void {
    const todoDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todoDatas &&(this.todoSignal.set(JSON.parse(todoDatas)));
  }

  public saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodoInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if(todoId) {
      this.todoSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true)
        this.saveTodosInLocalStorage();

      })
    }
  }
  public handleDeleteTodo(todo: Todo): void {
    if(todo) {
      const index = this.todosList().indexOf(todo);

      if(index !== -1) {
        this.todoSignal.mutate((todos)=> {
          todos.splice(index, 1)
          this.saveTodosInLocalStorage();
        })
      }

    }
  }
}
