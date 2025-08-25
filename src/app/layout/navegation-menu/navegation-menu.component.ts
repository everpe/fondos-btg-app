import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AppStateService } from '../../core/services/state/app-state.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    CurrencyPipe
  ],
template: `
    <mat-toolbar color="primary" class="navbar">
      <!-- Navegación izquierda -->
      <div class="nav-links">
        <button mat-button routerLink="/funds" routerLinkActive="active-link">
          Fondos
        </button>
        <button mat-button routerLink="/transactions" routerLinkActive="active-link">
          Transacciones
        </button>
        <button mat-button routerLink="/subscriptions" routerLinkActive="active-link">
          Suscripciones
        </button>
      </div>

      <!-- Sección derecha: saldo -->
      <div class="user-balance" *ngIf="user$ | async as user">
        <mat-icon>attach_money</mat-icon>
        <span class="balance">
          {{ user.balance | currency:'COP':'symbol-narrow':'1.0-0' }}
        </span>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-links {
      display: flex;
      gap: 1rem;
    }
    .active-link {
      font-weight: bold;
      border-bottom: 2px solid #fff;
    }
    .user-balance {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    .balance {
      font-size: 0.95rem;
    }
  `]
})
export class NavegationMenuComponent {
  private readonly appState = inject(AppStateService);
  user$ = this.appState.user$; // stream reactivo del usuario
}
