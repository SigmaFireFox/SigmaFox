import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesBasicsScreen } from './estimates-basics.screen';

describe('EstimatesBasicsComponent', () => {
  let component: EstimatesBasicsScreen;
  let fixture: ComponentFixture<EstimatesBasicsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesBasicsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesBasicsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
