import { Injectable } from '@angular/core';
import { Fund, Subscription, User } from '../../models';

export interface ValidationResult {
  isValid: boolean;
  errorCode?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FundValidatorsService {


  /**
   * Validar si el monto dede ahorro cumple con el mínimo requerido del fondo
   */
  validateMinimumAmount(fund: Fund, amount: number): boolean {
    return amount >= fund.minimumAmount;
  }

  /**
   * Validar si el usuario tiene saldo suficiente para la suscripción
   */
  validateSufficientBalance(user: User, amount: number): boolean {
    return user.balance >= amount;
  }

  /**
   * Validar si el usuario ya tiene una suscripción activa a un fondo
   */
  validateNotAlreadySubscribed(subscriptions: Subscription[], fundId: number): boolean {
    return !subscriptions.some(sub => sub.fundId === fundId);
  }

  /**
   * Validar si se puede cancelar la suscripción
   */
  validateCancelable(subscriptions: Subscription[], fundId: number): boolean {
    return subscriptions.some(sub => sub.fundId === fundId);
  }

  /**
   * Método combinado para suscripción
   */
  canSubscribe(user: User, fund: Fund, amount: number, subscriptions: Subscription[]): { valid: boolean, error?: string } {
    if (!this.validateMinimumAmount(fund, amount)) {
      return { valid: false, error: `El monto mínimo para este fondo es ${fund.minimumAmount}` };
    }

    if (!this.validateSufficientBalance(user, amount)) {
      return { valid: false, error: 'Saldo insuficiente' };
    }

    if (!this.validateNotAlreadySubscribed(subscriptions, fund.id)) {
      return { valid: false, error: 'Ya estás suscrito a este fondo' };
    }

    return { valid: true };
  }

  /**
   * Método combinado para cancelación
   */
  canCancel(subscriptions: Subscription[], fundId: number): { valid: boolean, error?: string } {
    if (!this.validateCancelable(subscriptions, fundId)) {
      return { valid: false, error: 'No tienes suscripción activa en este fondo' };
    }
    return { valid: true };
  }
}
