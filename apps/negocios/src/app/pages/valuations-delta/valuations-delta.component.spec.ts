import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationsDeltaComponent } from './valuations-delta.component';

describe('ValuationsDeltaComponent', () => {
  let component: ValuationsDeltaComponent;
  let fixture: ComponentFixture<ValuationsDeltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuationsDeltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationsDeltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
