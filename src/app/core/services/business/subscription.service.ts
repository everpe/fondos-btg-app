import { inject, Injectable } from '@angular/core';
import { throwError, switchMap, take, tap } from 'rxjs';
import { User, Fund, Transaction, Subscription } from '../../models';
import { TransactionsApiService } from '../api/transactions-api.service';
import { UserApiService } from '../api/user-api.service';
import { SubscriptionApiService } from '../api/subscription-api.service';
import { FundValidatorsService } from '../validators/fund-validators.service';
import { AppStateService } from '../state/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly subscriptionsApi = inject(SubscriptionApiService);
  private readonly transactionsApi = inject(TransactionsApiService);
  private readonly userApi = inject(UserApiService);
  private readonly fundValidators = inject(FundValidatorsService);
  private readonly appState = inject(AppStateService);
  /**
   * Obtener suscripciones activas del usuario
   */
  getUserSubscriptions(userId: number) {
    return this.subscriptionsApi.getSubscriptionsByUser(userId);
  }

  /**
   * Suscribir a un fondo
   */
  subscribeToFund(user: User, fund: Fund, amount: number) {
    return this.subscriptionsApi.getSubscriptionsByUser(user.id).pipe(
      take(1),
      switchMap((subs: Subscription[]) => {
        const validation = this.fundValidators.canSubscribe(user, fund, amount, subs);
        if (!validation.valid) {
          return throwError(() => new Error(validation.error));
        }

        const subscription: Omit<Subscription, 'id'> = {
          userId: user.id,
          fundId: fund.id,
          amount,
          date: new Date().toISOString()
        };

        const transaction: Omit<Transaction, 'id'> = {
          userId: user.id,
          fundId: fund.id,
          type: 'subscription',
          amount,
          date: new Date().toISOString()
        };

        return this.userApi.updateBalance(user.id, user.balance - amount).pipe(
          tap((updatedUser) => {
            // Actualizamos AppState con el nuevo user
            this.appState.setUser(updatedUser);
          }),

          switchMap(() => this.subscriptionsApi.createSubscription(subscription)),
          tap((createdSub) => {
            // Añadir la suscripción al estado global
            this.appState.addSubscription(createdSub);
          }),

          switchMap(() => this.transactionsApi.createTransaction(transaction)),
          tap((txn) => {
            //  Añadir la transacción al estado global
            this.appState.addTransaction(txn);
          })
        );
      })
    );
  }



  /**
   * Cancelar suscripción a un fondo
   */
  cancelSubscription(user: User, subscription: Subscription, currentSubscriptions: Subscription[]) {
    const validation = this.fundValidators.canCancel(currentSubscriptions, subscription.fundId);
    if (!validation.valid) {
      return throwError(() => new Error(validation.error));
    }

    const transaction: Omit<Transaction, 'id'> = {
      userId: user.id,
      fundId: subscription.fundId,
      type: 'cancellation',
      amount: subscription.amount,
      date: new Date().toISOString()
    };

    return this.subscriptionsApi.deleteSubscription(subscription.id).pipe(
      switchMap(() => this.userApi.updateBalance(user.id, user.balance + subscription.amount)),
      tap((updatedUser) => {
        // Actualizamos el balance del usuario en el estado
        this.appState.setUser(updatedUser);
      }),

      switchMap(() => this.transactionsApi.createTransaction(transaction)),
      tap((newTransaction) => {
        // Quitamos la suscripción del estado global
        this.appState.removeSubscription(subscription.id);
        // Agregamos la transacción en el estado global
        this.appState.addTransaction(newTransaction);
      })
    );
  }


}
