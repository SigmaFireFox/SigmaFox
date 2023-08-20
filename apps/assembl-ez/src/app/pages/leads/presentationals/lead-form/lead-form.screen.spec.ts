import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFormScreen } from './lead-form.screen';

describe('AddLeadComponent', () => {
  let component: LeadFormScreen;
  let fixture: ComponentFixture<LeadFormScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadFormScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadFormScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
