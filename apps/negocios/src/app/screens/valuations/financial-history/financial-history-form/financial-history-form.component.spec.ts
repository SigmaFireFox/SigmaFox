import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHistoryFormComponent } from './financial-history-form.component';

describe('FinancialHistoryFormComponent', () => {
  let component: FinancialHistoryFormComponent;
  let fixture: ComponentFixture<FinancialHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialHistoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
