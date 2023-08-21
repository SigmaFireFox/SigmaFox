import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileScreen } from './view-profile.screen';

describe('ViewProfileComponent', () => {
  let component: ViewProfileScreen;
  let fixture: ComponentFixture<ViewProfileScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProfileScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
