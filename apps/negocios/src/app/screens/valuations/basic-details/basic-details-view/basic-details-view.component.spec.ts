import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailsViewScreen } from './basic-details-view.component';

describe('BasicDetailsComponent', () => {
  let component: BasicDetailsViewScreen;
  let fixture: ComponentFixture<BasicDetailsViewScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicDetailsViewScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailsViewScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
