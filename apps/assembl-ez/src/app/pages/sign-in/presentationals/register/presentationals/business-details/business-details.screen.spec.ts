import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsScreen } from './business-details.screen';

describe('BusinessDetailsComponent', () => {
  let component: BusinessDetailsScreen;
  let fixture: ComponentFixture<BusinessDetailsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessDetailsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
