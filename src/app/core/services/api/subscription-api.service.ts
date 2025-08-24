import { inject, Injectable } from '@angular/core';
import { Subscription } from '../../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApiService {

  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3001';

  /**
   * Obtener todas las suscripciones
   */
  getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.API_URL}/subscriptions`);
  }

  /**
   * Obtener suscripciones de un usuario
   */
  getSubscriptionsByUser(userId: number): Observable<Subscription[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Subscription[]>(`${this.API_URL}/subscriptions`, { params });
  }

  /**
   * Crear una nueva suscripción
   */
  createSubscription(subscription: Omit<Subscription, 'id'>): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.API_URL}/subscriptions`, subscription);
  }

  /**
   * Eliminar una suscripción
   */
  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/subscriptions/${id}`);
  }
}
