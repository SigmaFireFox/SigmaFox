import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesPage } from './estimates.page';

describe('EstimatesComponent', () => {
  let component: EstimatesPage;
  let fixture: ComponentFixture<EstimatesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
