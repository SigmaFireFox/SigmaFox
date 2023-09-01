import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationsFullComponent } from './valuations-full.component';

describe('ValuationsFullComponent', () => {
  let component: ValuationsFullComponent;
  let fixture: ComponentFixture<ValuationsFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuationsFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationsFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
