import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuPage } from './main-menu.page';

describe('MainMenuPage', () => {
  let component: MainMenuPage;
  let fixture: ComponentFixture<MainMenuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
