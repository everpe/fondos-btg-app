import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fund } from '../../models';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para manejar todas las operaciones API relacionadas con fondos
 */
export class FundsApiService {

  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3001';

  /**
   * Obtener todos los fondos disponibles
   */
  getAllFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${this.API_URL}/funds`);
  }

  /**
   * Obtener fondo específico por ID
   */
  getFundById(id: number): Observable<Fund> {
    return this.http.get<Fund>(`${this.API_URL}/funds/${id}`);
  }

  /**
   * Filtrar fondos por categoría
   */
  getFundsByCategory(category: 'FPV' | 'FIC'): Observable<Fund[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Fund[]>(`${this.API_URL}/funds`, { params });
  }

  /**
   * Buscar fondos por nombre (para funcionalidad futura)
   */
  searchFunds(searchTerm: string): Observable<Fund[]> {
    const params = new HttpParams().set('name_like', searchTerm);
    return this.http.get<Fund[]>(`${this.API_URL}/funds`, { params });
  }

  /**
   * Obtener fondos con monto mínimo menor o igual al especificado
   */
  getFundsWithinBudget(maxAmount: number): Observable<Fund[]> {
    const params = new HttpParams().set('minimumAmount_lte', maxAmount.toString());
    return this.http.get<Fund[]>(`${this.API_URL}/funds`, { params });
  }

}
