import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fund } from '../../../core/models';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-funds-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatCardContent,
    CurrencyPipe,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './funds-card.component.html',
  styleUrl: './funds-card.component.scss'
})
export class FundsCardComponent {
  @Input() fund!: Fund;
  @Output() subscribe = new EventEmitter<{ fund: Fund; amount: number, notificationMethod: 'email' | 'sms' }>();

  form: FormGroup;
  showForm = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      notificationMethod: ['email', Validators.required]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.form.valid) {
      this.subscribe.emit(
        { 
          fund: this.fund, 
          amount: this.form.value.amount,
          notificationMethod: this.form.value.notificationMethod 
        });
      this.form.reset();
      this.showForm = false;
    }
  }
}
