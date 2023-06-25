import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  connected$ = new BehaviorSubject<boolean>(false);


  constructor() {
    setTimeout(() => {
      this.connected$.next(true);
    }, 5000);
  }

  shareNewConnectionInformation(connected: boolean) {
    this.connected$.next(connected);
  }
}