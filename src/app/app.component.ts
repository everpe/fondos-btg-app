import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { FundsApiService } from './core/services/api/funds-api.service';
import { UserApiService } from './core/services/api/user-api.service';
import { AppStateService } from './core/services/state/app-state.service';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'btg-funds-app';


  private appState = inject(AppStateService);

  ngOnInit() {
    this.appState.initializeApp();
  }
}
