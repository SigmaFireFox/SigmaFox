import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesIntroductionScreen } from './estimates-introduction.screen';

describe('EstimatesIntroductionComponent', () => {
  let component: EstimatesIntroductionScreen;
  let fixture: ComponentFixture<EstimatesIntroductionScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesIntroductionScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesIntroductionScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
