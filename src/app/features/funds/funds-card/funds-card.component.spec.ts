import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundsCardComponent } from './funds-card.component';
import { By } from '@angular/platform-browser';
import { Fund, User } from '../../../core/models/index'; 
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { UserApiService } from '../../../core/services/api/user-api.service';
import { AppStateService } from '../../../core/services/state/app-state.service';

describe('FundsCardComponent', () => {
  
  let component: FundsCardComponent;
  let fixture: ComponentFixture<FundsCardComponent>;

  const mockFund: Fund = {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minimumAmount: 75000,
    category: 'FPV',
    description: 'Fondo de pensiones voluntarias con estrategia conservadora'
  };
  const mockUser: User = {
    id: 1,
    balance: 100000,
    preferredNotification: 'email'
  };
  const mockAppState = {
    getUser: () => of(mockUser),
    getFunds: () => of([mockFund])
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FundsCardComponent,
        NoopAnimationsModule, // evita errores de animaciones de Angular Material
        ReactiveFormsModule,
        MatCardModule,
        MatRadioModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        { provide: UserApiService, useValue: { getUser: () => of(mockUser) } },
        { provide: AppStateService, useValue: mockAppState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FundsCardComponent);
    component = fixture.componentInstance;
    component.fund = mockFund; // pasamos el fondo de prueba
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el nombre del fondo', () => {
    const title = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain(mockFund.name);
  });

  it('debería alternar el formulario al hacer clic en "Suscribirse"', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.showForm).toBeTrue();
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('debería emitir el evento subscribe al enviar un formulario válido', () => {
    spyOn(component.subscribe, 'emit');

    // Abrir el formulario
    component.toggleForm();
    fixture.detectChanges();

    // Llenar el formulario
    component.form.setValue({ amount: 100000, notificationMethod: 'sms' });
    fixture.detectChanges();

    // Ejecutar submit
    component.onSubmit();

    expect(component.subscribe.emit).toHaveBeenCalledWith({
      fund: mockFund,
      amount: 100000,
      notificationMethod: 'sms'
    });
  });
});
