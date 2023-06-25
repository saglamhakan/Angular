import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { TodoService } from '../todo.service';



@NgModule({
  declarations: [
    ContactDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TodoService
  ],
  exports: [
    ContactDetailsComponent
  ]
})
export class ContactModule { }