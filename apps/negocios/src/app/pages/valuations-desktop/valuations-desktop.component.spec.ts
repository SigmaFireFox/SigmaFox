import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationsDesktopComponent } from './valuations-desktop.component';

describe('ValuationsDesktopComponent', () => {
  let component: ValuationsDesktopComponent;
  let fixture: ComponentFixture<ValuationsDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuationsDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
