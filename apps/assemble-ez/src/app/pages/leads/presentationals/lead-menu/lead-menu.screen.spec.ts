import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadMenuScreen } from './lead-menu.screen';

describe('LeadMenuComponent', () => {
  let component: LeadMenuScreen;
  let fixture: ComponentFixture<LeadMenuScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadMenuScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadMenuScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
