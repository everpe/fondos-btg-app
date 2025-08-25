import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AppStateService } from './core/services/state/app-state.service';
import { NavegationMenuComponent } from './layout/navegation-menu/navegation-menu.component';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavegationMenuComponent
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
