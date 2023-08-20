import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsPage } from './leads.page';

describe('LeadsComponent', () => {
  let component: LeadsPage;
  let fixture: ComponentFixture<LeadsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
