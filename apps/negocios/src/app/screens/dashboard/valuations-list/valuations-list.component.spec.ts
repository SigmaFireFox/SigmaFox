import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationsListComponent } from './valuations-list.component';

describe('ValuationsListComponent', () => {
  let component: ValuationsListComponent;
  let fixture: ComponentFixture<ValuationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
