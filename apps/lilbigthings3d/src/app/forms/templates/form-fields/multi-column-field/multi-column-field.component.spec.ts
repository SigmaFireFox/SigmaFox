import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiColumnFieldComponent } from './multi-column-field.component';

describe('MultiColumnFieldComponent', () => {
  let component: MultiColumnFieldComponent;
  let fixture: ComponentFixture<MultiColumnFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiColumnFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiColumnFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
