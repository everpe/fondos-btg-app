import { Component, inject } from '@angular/core';
import { Fund, User } from '../../../core/models';
import { SubscriptionService } from '../../../core/services/business/subscription.service';
import { AppStateService } from '../../../core/services/state/app-state.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Imports de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FundsCardComponent } from '../funds-card/funds-card.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-funds-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FundsCardComponent,
    MatButtonModule
  ],
  templateUrl: './funds-page.component.html',
  styleUrl: './funds-page.component.scss'
})
export class FundsPageComponent {
  private readonly appState = inject(AppStateService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly fb = inject(FormBuilder);

  funds: Fund[] = [];
  user: User | null = null;

  form = this.fb.group({
    fundId: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.appState.funds$.subscribe(funds => {this.funds = funds, console.log(funds)});
    this.appState.user$.subscribe(user => {this.user = user, console.log(user)});
  }


  onSubscribe({ fund, amount }: { fund: Fund; amount: number }) {
    if (!this.user) return;

    this.subscriptionService.subscribeToFund(this.user, fund, amount).subscribe({
      next: () => alert(`Suscripción exitosa al fondo ${fund.name}`),
      error: (err) => alert(`Error: ${err.message}`)
    });
  }
}
