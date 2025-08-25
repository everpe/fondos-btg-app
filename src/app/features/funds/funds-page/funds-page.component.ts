import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/business/notification.service';
import { Fund, User } from '../../../core/models';
import { SubscriptionService } from '../../../core/services/business/subscription.service';
import { AppStateService } from '../../../core/services/state/app-state.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FundsCardComponent } from '../funds-card/funds-card.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-funds-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FundsCardComponent,
    MatButtonModule
  ],
  templateUrl: './funds-page.component.html',
  styleUrl: './funds-page.component.scss'
})
export class FundsPageComponent {
  private readonly appState = inject(AppStateService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly fb = inject(FormBuilder);

  private readonly notificationService = inject(NotificationService);

  funds: Fund[] = [];
  user: User | null = null;

  form = this.fb.group({
    fundId: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.appState.funds$.subscribe(funds => {this.funds = funds});
    this.appState.user$.subscribe(user => {this.user = user});
  }


  onSubscribe({ fund, amount, notificationMethod }: { fund: Fund; amount: number; notificationMethod: 'email' | 'sms' }) {
    if (!this.user) return;

    this.subscriptionService.subscribeToFund(this.user, fund, amount, notificationMethod ).subscribe({
      next: () => this.notificationService.success(`Suscripción exitosa al fondo ${fund.name}`),
      error: (err) => this.notificationService.error(`${err.message}`)
    });
  }
}
