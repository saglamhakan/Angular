import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements AfterViewInit {
  @ViewChild('title') titleInput?: NgModel;
  todoItem!: Todo;
  todoId?: number;

  date: string = '';
  time: string = '';

  isSuccess: boolean = false;

  get isButtonDisabled() {
    if (this.titleInput) {
      return this.titleInput.invalid;
    }
    return true;
  }

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const params = this.route.snapshot.params;
    if (params['id']) {
      // Update sayfasıdır.
      let todoItem = this.todoService.getTodoItem(parseInt(params['id']));
      if (!todoItem) {
        this.router.navigateByUrl('/todos');
      } else {
        this.todoItem = todoItem;
        this.setDateTime();
        this.todoId = this.todoItem.id;
      }
    } else {
      // Create sayfasıdır.
      this.resetForm();
    }
  }

  ngAfterViewInit(): void {
      console.log(this.titleInput);
  }

  handleDateChange(value: string) {
    // 2023-06-07
    const dateTimeParts = this.todoItem.dueDate.split('T');
    dateTimeParts[0] = value;
    this.todoItem.dueDate = dateTimeParts.join('T');
    console.log(this.todoItem.dueDate);
  }

  handleTimeChange(value: string) {
    // 09:32
    const dateTimeParts = this.todoItem.dueDate.split('T');
    const time = dateTimeParts[1];
    const timeParts = time.split(':');
    const valueParts = value.split(':');
    timeParts[0] = valueParts[0];
    timeParts[1] = valueParts[1];
    timeParts[2] = '00.000Z';
    dateTimeParts[1] = timeParts.join(':');
    const date = new Date(dateTimeParts.join('T'));
    date.setMinutes(date.getMinutes() + this.getTimezoneOffset());
    this.todoItem.dueDate = date.toISOString();
    console.log(this.todoItem.dueDate);
    // console.log(value);
  }

  handleSaveTodoItem() {
    if (this.todoId) {
      this.todoService.updateTodoItem(this.todoId, this.todoItem);
    } else {
      this.todoService.addTodoItem(this.todoItem);
      this.resetForm();
    }
    this.isSuccess = true;
  }

  private resetForm() {
    this.todoItem = {
      id: 0,
      title: '',
      dueDate: new Date().toISOString() // 2023-06-23T06:35:48.863Z
    };
    this.setDateTime();
    setTimeout(() => {
      this.isSuccess = false;
    }, 2000);
  }

  private getTimezoneOffset(): number {
    return new Date().getTimezoneOffset();
  }

  private setDateTime() {
    const timeString = new Date(this.todoItem.dueDate).toTimeString();
    const dueDateParts = this.todoItem.dueDate.split('T');
    this.date = dueDateParts[0];
    this.time = timeString.split(' ')[0].split(':').slice(0, 2).join(':');
  }
}