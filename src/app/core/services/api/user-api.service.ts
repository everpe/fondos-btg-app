import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, NotificationType } from '../../models';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para manejar todas las operaciones API relacionadas con usuarios
 */
export class UserApiService {


  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000'; // TODO: Move to environment

  /**
   * Obtener información del usuario
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user`);
  }

  /**
   * Actualizar información completa del usuario
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/user`, user);
  }

  /**
   * Actualizar solo el balance del usuario
   * Más eficiente que actualizar todo el objeto
   */
  updateBalance(userId: number, newBalance: number): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/user`, {
      balance: newBalance
    });
  }

  /**
   * Actualizar método de notificación preferido
   */
  updateNotificationPreference(method: NotificationType): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/user`, {
      preferredNotification: method
    });
  }
}
