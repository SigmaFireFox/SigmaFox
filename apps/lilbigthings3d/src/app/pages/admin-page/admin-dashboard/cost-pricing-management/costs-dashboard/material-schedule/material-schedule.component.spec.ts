import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialScheduleComponent } from './material-schedule.component';

describe('MaterialScheduleComponent', () => {
  let component: MaterialScheduleComponent;
  let fixture: ComponentFixture<MaterialScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
