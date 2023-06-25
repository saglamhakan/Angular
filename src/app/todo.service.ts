import { Injectable } from '@angular/core';
import { Todo, TodoResponse } from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList: Todo[] = [
    {
      id: 1,
      title: "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
      dueDate: "2023-11-26T00:46:21Z"
    },
    {
      id: 2,
      title: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
      dueDate: "2024-06-11T04:18:30Z"
    },
    {
      id: 3,
      title: "Pellentesque at nulla. Suspendisse potenti.",
      dueDate: "2023-11-11T07:21:45Z"
    },
    {
      id: 4,
      title: "Integer a nibh.",
      dueDate: "2023-07-15T08:37:34Z"
    },
    {
      id: 5,
      title: "Donec ut dolor.",
      dueDate: "2023-07-06T20:25:56Z"
    },
    {
      id: 6,
      title: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
      dueDate: "2023-10-10T20:21:20Z"
    },
    {
      id: 7,
      title: "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
      dueDate: "2024-06-14T18:35:50Z"
    },
    {
      id: 8,
      title: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.",
      dueDate: "2023-07-13T01:04:28Z"
    },
    {
      id: 9,
      title: "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      dueDate: "2024-04-10T21:56:10Z"
    },
    {
      id: 10,
      title: "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      dueDate: "2023-08-15T19:42:14Z"
    },
    {
      id: 11,
      title: "Morbi non quam nec dui luctus rutrum. Nulla tellus.",
      dueDate: "2023-06-25T10:53:42Z"
    },
    {
      id: 12,
      title: "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
      dueDate: "2023-12-05T22:52:24Z"
    },
    {
      id: 13,
      title: "Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
      dueDate: "2024-06-08T19:13:55Z"
    },
    {
      id: 14,
      title: "In hac habitasse platea dictumst. Etiam faucibus cursus urna.",
      dueDate: "2023-10-19T14:22:34Z"
    },
    {
      id: 15,
      title: "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      dueDate: "2024-06-09T06:44:55Z"
    },
    {
      id: 16,
      title: "Nullam varius.",
      dueDate: "2023-07-23T00:18:45Z"
    },
    {
      id: 17,
      title: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
      dueDate: "2023-12-16T07:44:52Z"
    },
    {
      id: 18,
      title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      dueDate: "2023-07-16T13:07:30Z"
    },
    {
      id: 19,
      title: "Duis ac nibh.",
      dueDate: "2023-09-18T06:47:47Z"
    },
    {
      id: 20,
      title: "Fusce consequat.",
      dueDate: "2024-05-24T10:18:56Z"
    },
    {
      id: 21,
      title: "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.",
      dueDate: "2024-02-28T16:02:38Z"
    },
    {
      id: 22,
      title: "Integer ac neque.",
      dueDate: "2023-08-11T09:18:34Z"
    },
    {
      id: 23,
      title: "Vivamus vestibulum sagittis sapien.",
      dueDate: "2024-05-16T16:57:26Z"
    },
    {
      id: 24,
      title: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
      dueDate: "2024-06-12T18:17:00Z"
    },
    {
      id: 25,
      title: "In quis justo.",
      dueDate: "2023-06-23T18:43:28Z"
    },
    {
      id: 26,
      title: "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
      dueDate: "2024-01-29T00:35:31Z"
    },
    {
      id: 27,
      title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      dueDate: "2024-04-15T11:41:09Z"
    },
    {
      id: 28,
      title: "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
      dueDate: "2023-07-12T12:45:51Z"
    },
    {
      id: 29,
      title: "Maecenas pulvinar lobortis est.",
      dueDate: "2023-11-07T20:31:07Z"
    },
    {
      id: 30,
      title: "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
      dueDate: "2023-10-07T10:08:29Z"
    },
    {
      id: 31,
      title: "Proin at turpis a pede posuere nonummy.",
      dueDate: "2023-10-11T01:39:32Z"
    },
    {
      id: 32,
      title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.",
      dueDate: "2024-05-17T15:05:07Z"
    },
    {
      id: 33,
      title: "Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      dueDate: "2024-02-05T21:32:58Z"
    },
    {
      id: 34,
      title: "Nulla ut erat id mauris vulputate elementum. Nullam varius.",
      dueDate: "2024-01-07T19:27:10Z"
    },
    {
      id: 35,
      title: "In congue. Etiam justo.",
      dueDate: "2023-11-17T05:37:32Z"
    },
    {
      id: 36,
      title: "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
      dueDate: "2024-06-20T22:37:06Z"
    },
    {
      id: 37,
      title: "Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      dueDate: "2024-04-29T23:02:52Z"
    },
    {
      id: 38,
      title: "Donec dapibus. Duis at velit eu est congue elementum.",
      dueDate: "2024-03-24T03:13:58Z"
    },
    {
      id: 39,
      title: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
      dueDate: "2024-05-24T15:02:56Z"
    },
    {
      id: 40,
      title: "Vivamus in felis eu sapien cursus vestibulum.",
      dueDate: "2023-11-03T17:07:18Z"
    },
    {
      id: 41,
      title: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
      dueDate: "2023-08-14T18:42:50Z"
    },
    {
      id: 42,
      title: "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      dueDate: "2024-04-09T00:20:56Z"
    },
    {
      id: 43,
      title: "Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
      dueDate: "2023-07-06T02:16:58Z"
    },
    {
      id: 44,
      title: "Nunc purus. Phasellus in felis.",
      dueDate: "2023-08-23T10:05:39Z"
    },
    {
      id: 45,
      title: "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
      dueDate: "2023-09-21T14:35:57Z"
    },
    {
      id: 46,
      title: "Quisque ut erat. Curabitur gravida nisi at nibh.",
      dueDate: "2023-10-26T10:58:20Z"
    },
    {
      id: 47,
      title: "Etiam justo. Etiam pretium iaculis justo.",
      dueDate: "2023-07-18T20:53:55Z"
    },
    {
      id: 48,
      title: "Sed accumsan felis.",
      dueDate: "2024-02-04T09:25:25Z"
    },
    {
      id: 49,
      title: "Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
      dueDate: "2023-10-03T17:13:31Z"
    },
    {
      id: 50,
      title: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
      dueDate: "2023-10-06T00:43:06Z"
    }
  ];

  private apiUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) {
    console.log('TodoService is creating a new instance');
  }

  getTodoList(): Observable<TodoResponse[]> {
    return this.http.get<TodoResponse[]>(this.apiUrl + '/todos');
    // return this.todoList;
  }

  addTodoItem(todoItem: Todo): void {
    todoItem.id = this.todoList.length + 1;
    this.todoList.push(todoItem);
  }

  updateTodoItem(id: number, todoItem: Todo): void {
    const _todoItem = this.todoList.find((_todo: Todo) => {
      return _todo.id === id;
    });
    if (_todoItem) {
      _todoItem.title = todoItem.title;
      _todoItem.dueDate = todoItem.dueDate;
    }
  }

  deleteTodoItem(id: number) {
    const itemIndex = this.todoList.findIndex((_todo: Todo) => {
      return _todo.id === id;
    });
    this.todoList.splice(itemIndex, 1);
    /* this.todoList = this.todoList.filter((_todo: Todo) => {
      return _todo.id !== id;
    })*/
  }

  getTodoItem(id: number): Todo | undefined {
    // let todo: Todo | undefined;
    /*for (let i = 0; i < this.todoList.length; i++) {
      const _todo = this.todoList[i];
      console.log(i);
      if (_todo.id === id) {
        // todo = _todo;
        return _todo;
      };
    }
    return;*/
    return this.todoList.find((_todo: Todo) => {
      return _todo.id === id;
    });
    // return todo;
  }
}