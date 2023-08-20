import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteParametersScreen } from './quote-parameters.screen';

describe('QuoteParametersComponent', () => {
  let component: QuoteParametersScreen;
  let fixture: ComponentFixture<QuoteParametersScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteParametersScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteParametersScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
