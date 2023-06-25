import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Input() footerText: string = '';
  @Output() onFooterTextChange = new EventEmitter<string>();

  ngOnInit(): void {
      console.log('Footer component ngOnInit function works');
  }

  ngOnDestroy(): void {
      console.log('Footer component is being destroyed');
  }

  handleFooterTextChange(value: string) {
    this.onFooterTextChange.emit(value);
  }
}
