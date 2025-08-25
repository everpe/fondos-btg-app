import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/business/notification.service';
import { Subscription, User } from '../../../core/models';
import { SubscriptionService } from '../../../core/services/business/subscription.service';
import { AppStateService } from '../../../core/services/state/app-state.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, map } from 'rxjs';
@Component({
  selector: 'app-subscriptions-list',
  imports: [
    CommonModule,
    MatListModule ,
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.scss'
})
export class SubscriptionsListComponent implements OnInit {
  private readonly appState = inject(AppStateService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly notificationService = inject(NotificationService);

  subscriptions: Subscription[] = [];
  user: User | null = null;
  subscriptionsWithFundName$ = combineLatest([
      this.appState.subscriptions$,
      this.appState.funds$
    ]).pipe(
      map(([subs, funds]) =>
        subs.map(sub => ({
          ...sub,
          fundName: funds.find(f => f.id === sub.fundId)?.name ?? 'Fondo desconocido'
        }))
      )
    );


  ngOnInit(): void {
    this.appState.subscriptions$.subscribe(subs => this.subscriptions = subs);
    this.appState.user$.subscribe(user => {this.user = user; console.log(user)});
  }

  cancel(sub: Subscription) {
    if (!this.user) return;

    const confirmCancel = window.confirm(`¿Estás seguro que deseas cancelar la suscripción al fondo ${sub.fundId}?`);
    if (!confirmCancel) return;

    this.subscriptionService.cancelSubscription(this.user, sub, this.subscriptions).subscribe({
      next: () => {
        this.notificationService.success(`Cancelaste la suscripción al fondo ${sub.fundId}.Se devolvieron $${sub.amount} a tu saldo`);
        this.appState.updateUserBalance(this.user!.balance);
        this.appState.removeSubscription(sub.id);
      },
      error: (err) => this.notificationService.error(`Error: ${err.message}`)
    });
  }



}
