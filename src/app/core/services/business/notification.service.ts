import { inject, Injectable } from '@angular/core';
import { NotificationType } from '../../models';
import { ToastrService } from 'ngx-toastr'; // si decides usar ngx-toastr
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private toastr = inject(ToastrService);

  /**
   * Notificar al usuario según su preferencia
   */
  notifyUser(method: NotificationType, message: string) {
    if (method === 'email') {
      this.toastr.success(message, '📧 Notificación enviada por Email');
      console.log(`[EMAIL] ${message}`);
    } else if (method === 'sms') {
      this.toastr.info(message, '📱 Notificación enviada por SMS');
      console.log(`[SMS] ${message}`);
    }
  }

  /**
   * Notificación de éxito
   */
  success(message: string) {
    this.toastr.success(message);
  }

  /**
   * Notificación de error
   */
  error(message: string) {
    this.toastr.error(message);
  }

  /**
   * Notificación de advertencia
   */
  warning(message: string) {
    this.toastr.warning(message);
  }

  /**
   * Notificación de información
   */
  info(message: string) {
    this.toastr.info(message);
  }
}
