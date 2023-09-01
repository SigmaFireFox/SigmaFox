import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynanmicMultiColumnFormComponent } from './dynamic-multi-column-form.component';

describe('MultiColumnFormComponent', () => {
  let component: DynanmicMultiColumnFormComponent;
  let fixture: ComponentFixture<DynanmicMultiColumnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynanmicMultiColumnFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynanmicMultiColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
