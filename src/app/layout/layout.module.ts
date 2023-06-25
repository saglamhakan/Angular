import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    ExponentialStrengthPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }