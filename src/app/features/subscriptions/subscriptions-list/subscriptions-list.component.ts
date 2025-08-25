import { Component, inject, OnInit } from '@angular/core';
import { Subscription, User } from '../../../core/models';
import { SubscriptionService } from '../../../core/services/business/subscription.service';
import { AppStateService } from '../../../core/services/state/app-state.service';
import {MatListModule} from '@angular/material/list';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-subscriptions-list',
  imports: [
    CommonModule,
    MatListModule ,
    CurrencyPipe,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.scss'
})
export class SubscriptionsListComponent implements OnInit {
  private readonly appState = inject(AppStateService);
  private readonly subscriptionService = inject(SubscriptionService);

  subscriptions: Subscription[] = [];
  user: User | null = null;

  ngOnInit(): void {
    this.appState.subscriptions$.subscribe(subs => this.subscriptions = subs);
    this.appState.user$.subscribe(user => this.user = user);
  }

  cancel(sub: Subscription) {
    if (!this.user) return;

    this.subscriptionService.cancelSubscription(this.user, sub, this.subscriptions).subscribe({
      next: () => {
        alert(`Cancelaste la suscripción al fondo ${sub.fundId}. Se devolvieron $${sub.amount} a tu saldo`);
        this.appState.removeSubscription(sub.id);
        this.appState.updateUserBalance(this.user!.balance + sub.amount);
      },
      error: (err) => alert(`Error: ${err.message}`)
    });
  }
}
