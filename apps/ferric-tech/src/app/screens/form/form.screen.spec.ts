import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScreen } from './form.screen';

describe('FormComponent', () => {
  let component: FormScreen;
  let fixture: ComponentFixture<FormScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
