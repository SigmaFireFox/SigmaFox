import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesworkspaceComponent } from './estimatesworkspace.component';

describe('EstimatesworkspaceComponent', () => {
  let component: EstimatesworkspaceComponent;
  let fixture: ComponentFixture<EstimatesworkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatesworkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesworkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
