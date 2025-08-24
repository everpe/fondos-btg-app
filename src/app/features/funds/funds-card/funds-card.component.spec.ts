import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsCardComponent } from './funds-card.component';

describe('FundsCardComponent', () => {
  let component: FundsCardComponent;
  let fixture: ComponentFixture<FundsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
