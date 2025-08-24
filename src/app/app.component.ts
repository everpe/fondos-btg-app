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


  private fundsApi = inject(FundsApiService);
  private userApi = inject(UserApiService);
  private appState = inject(AppStateService);

  ngOnInit() {
    this.fundsApi.getAllFunds().subscribe(funds => {
      this.appState.setFunds(funds);
    });

    this.userApi.getUser().subscribe(user => {
      this.appState.setUser(user);
    });
  }
}
