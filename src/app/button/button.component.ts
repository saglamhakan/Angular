import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonText: string  = '';
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
  @Output() onButtonClick = new EventEmitter<void>();

  connected$: BehaviorSubject<boolean>;

  constructor(
    private connectionService: ConnectionService
  ) {
    this.connected$ = this.connectionService.connected$;
  }

  handleButtonClick() {
    this.onButtonClick.emit();
  }
}
