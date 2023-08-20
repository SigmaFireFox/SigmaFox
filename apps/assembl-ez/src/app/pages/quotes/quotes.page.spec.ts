import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesPage } from './quotes.page';

describe('QuotesComponent', () => {
  let component: QuotesPage;
  let fixture: ComponentFixture<QuotesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotesPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
