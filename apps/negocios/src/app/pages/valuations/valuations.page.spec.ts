import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationsPage } from './valuations.page';

describe('ValuationsComponent', () => {
  let component: ValuationsPage;
  let fixture: ComponentFixture<ValuationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValuationsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
