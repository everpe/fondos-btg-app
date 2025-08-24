// Fondos modelo
export interface Fund {
  id: number;
  name: string;
  minimumAmount: number;
  category: 'FPV' | 'FIC';
  description: string;
}

// User models
export interface User {
  id: number;
  balance: number; //saldo
  preferredNotification: 'email' | 'sms';
}

// Transaction models
export interface Transaction {
    id: number;
  userId: number;
  fundId: number;
  type: 'subscription' | 'cancellation';
  amount: number;
  date: string; // ISO string, más fácil de serializar con json-server
}

// Subscription models
export interface Subscription {

    id: number;
  userId: number;
  fundId: number;
  amount: number;
  date: string; // ISO string
}

// API Response models
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Error models
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Notification types
export type NotificationType = 'email' | 'sms';