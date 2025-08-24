import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fund } from '../../../core/models';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-funds-card',
    standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatCardContent,
    CurrencyPipe
  ],
  templateUrl: './funds-card.component.html',
  styleUrl: './funds-card.component.scss'
})
export class FundsCardComponent {
  @Input() fund!: Fund;
  @Output() subscribe = new EventEmitter<Fund>();

  onSubscribe() {
    this.subscribe.emit(this.fund);
  }
}
