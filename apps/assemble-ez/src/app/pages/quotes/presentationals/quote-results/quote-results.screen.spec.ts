import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteResultsScreen } from './quote-results.screen';

describe('QuoteResultsComponent', () => {
  let component: QuoteResultsScreen;
  let fixture: ComponentFixture<QuoteResultsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteResultsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteResultsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
