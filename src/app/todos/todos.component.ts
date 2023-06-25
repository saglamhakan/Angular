import { Component, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo, TodoResponse } from '../todo';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnDestroy {

  todoList$ = new BehaviorSubject<Todo[]>([]);
  pageIndex: number = 0;
  pageSize: number = 10;
  totalPage: number = 1;

  todoListSubscription: Subscription;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['p'] !== undefined) {
        this.pageIndex = parseInt(queryParams['p']);
    }
    this.todoListSubscription = this.todoService.getTodoList().pipe(
      map((todoList: TodoResponse[]) => {
        return todoList.map((todoResponse: TodoResponse) => {
          const todo: Todo = {
            id: todoResponse.id,
            title: todoResponse.title,
            dueDate: new Date().toISOString()
          };
          return todo;
        })
      }),
      tap((todoList: Todo[]) => {
        this.todoList$.next(todoList);
        this.calculateTotalPage();
      })
    ).subscribe();
  }

  get isSliceable() {
    return this.todoList$.getValue().length >= 10;
  }

  ngOnDestroy(): void {
      this.todoListSubscription.unsubscribe();
  }

  private calculateTotalPage() {
    let totalPage = this.todoList$.getValue().length / this.pageSize;
    const remainingItems = this.todoList$.getValue().length % this.pageSize;
    if (remainingItems > 0) {
      totalPage++;
    }
    this.totalPage = totalPage;
  }

  handlePreviousPageButton() {
    if (this.pageIndex > 0) {
      this.pageIndex = this.pageIndex - 1;
    }
  }

  handleNextPageButton() {
    if (this.pageIndex < this.totalPage - 1) {
      this.pageIndex = this.pageIndex + 1;
      // this.pageIndex++;
    }
  }

  handleDeleteTodoItem(id: number) {
    let text = "Are you sure about deleting this todo item?";
    if (confirm(text) == true) {
      this.todoService.deleteTodoItem(id);
    }
  }

}