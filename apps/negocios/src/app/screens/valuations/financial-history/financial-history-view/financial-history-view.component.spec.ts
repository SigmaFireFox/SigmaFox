import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHistoryViewComponent } from './financial-history-view.component';

describe('FinancialHistoryViewComponent', () => {
  let component: FinancialHistoryViewComponent;
  let fixture: ComponentFixture<FinancialHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialHistoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
