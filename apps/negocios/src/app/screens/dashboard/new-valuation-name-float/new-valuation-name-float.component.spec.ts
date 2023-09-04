import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewValuationNameFloatComponent } from './new-valuation-name-float.component';

describe('NewValuationNameFloatComponent', () => {
  let component: NewValuationNameFloatComponent;
  let fixture: ComponentFixture<NewValuationNameFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewValuationNameFloatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewValuationNameFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
