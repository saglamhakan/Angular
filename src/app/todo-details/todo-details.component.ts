import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent {
  todoItem?: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {
    const params = this.route.snapshot.params;
    const todoId = parseInt(params['id']);
    this.todoItem = this.todoService.getTodoItem(todoId);
    if (!this.todoItem) {
      this.router.navigateByUrl('/todos');
    }
    console.log(this.todoItem);
  }
}