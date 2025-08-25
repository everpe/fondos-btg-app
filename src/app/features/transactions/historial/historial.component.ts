import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../../core/models';
import { AppStateService } from '../../../core/services/state/app-state.service';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
@Component({
  selector: 'app-historial',
  imports: [
    MatTableModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit{
 private readonly appState = inject(AppStateService);
  transactions: Transaction[] = [];

  displayedColumns = ['fundId', 'type', 'amount', 'date'];

  ngOnInit(): void {
    this.appState.transactions$.subscribe(txns => this.transactions = txns);
  }
}
