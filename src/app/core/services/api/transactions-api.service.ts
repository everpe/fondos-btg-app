import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Transaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para manejar operaciones API de transacciones y suscripciones
 */
export class TransactionsApiService {
  
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3001';

  /**
   * Obtener todas las transacciones (historial completo)
   */
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`);
  }

  /**
   * Obtener transacciones de un usuario específico
   */
  getTransactionsByUser(userId: number): Observable<Transaction[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`, { params });
  }

  /**
   * Registrar una nueva transacción (suscripción o cancelación)
   */
  createTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/transactions`, transaction);
  }

  /**
   * Obtener transacciones filtradas por tipo ("subscription" | "cancellation")
   */
  getTransactionsByType(type: 'subscription' | 'cancellation'): Observable<Transaction[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`, { params });
  }

  /**
   * Eliminar una transacción (opcional, por si se quiere soportar rollback)
   */
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/transactions/${id}`);
  }
}
