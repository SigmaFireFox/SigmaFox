import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFlagsScreen } from './feature-flags.screen';

describe('FeatureFlagsComponent', () => {
  let component: FeatureFlagsScreen;
  let fixture: ComponentFixture<FeatureFlagsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureFlagsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureFlagsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
