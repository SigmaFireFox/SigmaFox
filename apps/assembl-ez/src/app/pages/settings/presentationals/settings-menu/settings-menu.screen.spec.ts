import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMenuScreen } from './settings-menu.screen';

describe('SettingsMenuComponent', () => {
  let component: SettingsMenuScreen;
  let fixture: ComponentFixture<SettingsMenuScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsMenuScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMenuScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
