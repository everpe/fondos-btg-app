import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, NotificationType } from '../../models';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para manejar todas las operaciones API relacionadas con usuarios
 */
export class UserApiService {


  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.apiBaseUrl;

 /**
   * Obtener información del usuario (asumiendo usuario único id=1)
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/1`);
  }

  /**
   * Actualizar información completa del usuario
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/users/${user.id}`, user);
  }

  /**
   * Actualizar solo el balance del usuario
   */
  updateBalance(userId: number, newBalance: number): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/users/${userId}`, {
      balance: newBalance
    });
  }

  /**
   * Actualizar método de notificación preferido
   */
  updateNotificationPreference(userId: number, method: NotificationType): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/users/${userId}`, {
      preferredNotification: method
    });
  }
}
