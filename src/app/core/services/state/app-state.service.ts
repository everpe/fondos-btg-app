import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppError, Fund, LoadingState, NotificationType, Subscription, Transaction, User } from '../../models';
import { BehaviorSubject, forkJoin, Observable, switchMap, tap } from 'rxjs';
import { FundsApiService } from '../api/funds-api.service';
import { SubscriptionApiService } from '../api/subscription-api.service';
import { TransactionsApiService } from '../api/transactions-api.service';
import { UserApiService } from '../api/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly userApi = inject(UserApiService);
  private readonly fundsApi = inject(FundsApiService);
  private readonly subscriptionsApi = inject(SubscriptionApiService);
  private readonly transactionsApi = inject(TransactionsApiService);


  // Estado de usuario
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  // Lista de fondos
  private fundsSubject = new BehaviorSubject<Fund[]>([]);
  funds$: Observable<Fund[]> = this.fundsSubject.asObservable();

  // Suscripciones activas
  private subscriptionsSubject = new BehaviorSubject<Subscription[]>([]);
  subscriptions$: Observable<Subscription[]> = this.subscriptionsSubject.asObservable();

  // Historial de transacciones
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$: Observable<Transaction[]> = this.transactionsSubject.asObservable();

  // Estado global de carga
  private loadingStateSubject = new BehaviorSubject<LoadingState>('idle');
  loadingState$: Observable<LoadingState> = this.loadingStateSubject.asObservable();

  //errores globales
  private errorSubject = new BehaviorSubject<AppError | null>(null);
  error$: Observable<AppError | null> = this.errorSubject.asObservable();



initializeApp() {
    this.setLoadingState('loading');
    this.setError(null);

    this.userApi.getUser().pipe(
      tap(user => this.setUser(user)),
      switchMap(user =>
        forkJoin({
          funds: this.fundsApi.getAllFunds(),
          subs: this.subscriptionsApi.getSubscriptionsByUser(user.id),
          txns: this.transactionsApi.getTransactionsByUser(user.id)
        })
      )
    ).subscribe({
      next: ({ funds, subs, txns }) => {
        this.setFunds(funds);
        this.setSubscriptions(subs);
        this.setTransactions(txns);
        this.setLoadingState('success');
      },
      error: (err) => {
        this.setError({
          code: 'INIT_ERROR',
          message: 'Error al inicializar la aplicación',
          details: err
        });
        this.setLoadingState('error');
      }
    });
  }

  


  // ========================
  // Métodos de actualización
  // ========================

  // Usuario
  setUser(user: User) {
    this.userSubject.next(user);
  }

  updateUserBalance(newBalance: number) {
    const user = this.userSubject.value;
    if (user) {
      this.userSubject.next({ ...user, balance: newBalance });
    }
  }

  updatePreferredNotification(method: 'email' | 'sms') {
    const user = this.userSubject.value;
    if (user) {
      this.userSubject.next({ ...user, preferredNotification: method });
    }
  }

  // Fondos
  setFunds(funds: Fund[]) {
    this.fundsSubject.next(funds);
  }

  // Suscripciones
  setSubscriptions(subs: Subscription[]) {
    this.subscriptionsSubject.next(subs);
  }

  addSubscription(sub: Subscription) {
    this.subscriptionsSubject.next([...this.subscriptionsSubject.value, sub]);
  }

  removeSubscription(subId: number) {
    this.subscriptionsSubject.next(this.subscriptionsSubject.value.filter(s => s.id !== subId));
  }

  // Transacciones
  setTransactions(txns: Transaction[]) {
    this.transactionsSubject.next(txns);
  }

  addTransaction(txn: Transaction) {
    this.transactionsSubject.next([...this.transactionsSubject.value, txn]);
  }

  // Loading
  setLoadingState(state: LoadingState) {
    this.loadingStateSubject.next(state);
  }

  setError(error: AppError | null) {
    this.errorSubject.next(error);
  }


  resetState() {
    this.userSubject.next(null);
    this.fundsSubject.next([]);
    this.subscriptionsSubject.next([]);
    this.transactionsSubject.next([]);
    this.loadingStateSubject.next('idle');
    this.errorSubject.next(null);
  }

  
}
