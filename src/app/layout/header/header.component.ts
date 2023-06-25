import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('divElement') divElement?: ElementRef<HTMLDivElement>;

  hello: string = 'abcde';
  helloParagraph: string = '<p id="demo">Welcome to Angular!</p>';
  selectedOption: number = 2;
  uniqueId = 'abc';
  todoList: string[] = [
    'Angular component oluşturulacak',
    'Angular template yapısı incelenecek',
    'Angular *ngFor ekranda gösterilecek'
  ];

  creationDate = new Date(2023, 5, 21);
  amount = 1350.85;

  currentAmount = 2;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges function works with ', changes);
  }

  ngOnInit(): void {
      console.log('ngOnInit function works');
      console.log(this.divElement);
  }

  ngAfterViewInit(): void {
      console.log('ngAfterViewInit function works');
      console.log(this.divElement);
  }

  handleButtonClick() {
    this.hello = 'abcdef';
  }

  handleHelloTextChange(value: string) {
    this.hello = value;
  }

  handleSignUpButtonClick() {
    // Kullanıcının kayıt işlemlerini yönetiyoruz.
  }

  handleLoginButtonClick() {
    // Kullanıcının sisteme giriş işlemlerini yönetiyoruz.
  }

  handleAddNewTodoItem() {
    
  }
}