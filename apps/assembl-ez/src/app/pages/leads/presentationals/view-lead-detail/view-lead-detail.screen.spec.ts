import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeadDetailScreen } from './view-lead-detail.screen';

describe('ViewLeadDetailComponent', () => {
  let component: ViewLeadDetailScreen;
  let fixture: ComponentFixture<ViewLeadDetailScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLeadDetailScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeadDetailScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
