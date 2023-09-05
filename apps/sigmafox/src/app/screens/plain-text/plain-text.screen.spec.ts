import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainTextScreen } from './plain-text.screen';

describe('PlainTextComponent', () => {
  let component: PlainTextScreen;
  let fixture: ComponentFixture<PlainTextScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlainTextScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainTextScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
