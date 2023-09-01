import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsEmptyStateComponent } from './view-products-empty-state.component';

describe('ViewProductsEmptyStateComponent', () => {
  let component: ViewProductsEmptyStateComponent;
  let fixture: ComponentFixture<ViewProductsEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductsEmptyStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductsEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
