import { inject, Injectable } from '@angular/core';
import { throwError, switchMap } from 'rxjs';
import { User, Fund, Transaction, Subscription } from '../../models';
import { TransactionsApiService } from '../api/transactions-api.service';
import { UserApiService } from '../api/user-api.service';
import { SubscriptionApiService } from '../api/subscription-api.service';
import { FundValidatorsService } from '../validators/fund-validators.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

 private readonly subscriptionsApi = inject(SubscriptionApiService);
  private readonly transactionsApi = inject(TransactionsApiService);
  private readonly userApi = inject(UserApiService);
  private readonly fundValidators = inject(FundValidatorsService);

  /**
   * Obtener suscripciones activas del usuario
   */
  getUserSubscriptions(userId: number) {
    return this.subscriptionsApi.getSubscriptionsByUser(userId);
  }

  /**
   * Suscribir a un fondo
   */
  subscribeToFund(user: User, fund: Fund, amount: number, currentSubscriptions: Subscription[]) {
    
    const validation = this.fundValidators.canSubscribe(user, fund, amount, currentSubscriptions);
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

    // Orquestar la lógica: actualizar saldo → crear suscripción → crear transacción
    return this.userApi.updateBalance(user.id, user.balance - amount).pipe(
      switchMap(() => this.subscriptionsApi.createSubscription(subscription)),
      switchMap(() => this.transactionsApi.createTransaction(transaction))
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
      switchMap(() => this.transactionsApi.createTransaction(transaction))
    );
  }

}
