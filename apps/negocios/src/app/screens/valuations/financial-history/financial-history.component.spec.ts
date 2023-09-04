import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHistoryComponent } from './financial-history.component';

describe('FinancialHistoryComponent', () => {
  let component: FinancialHistoryComponent;
  let fixture: ComponentFixture<FinancialHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
