import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPullComponent } from './data-pull.component';

describe('DataPullComponent', () => {
  let component: DataPullComponent;
  let fixture: ComponentFixture<DataPullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
