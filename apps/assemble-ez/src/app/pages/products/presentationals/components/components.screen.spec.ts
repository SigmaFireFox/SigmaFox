import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPage } from './components.screen';

describe('PriceInputsComponent', () => {
  let component: ComponentsPage;
  let fixture: ComponentFixture<ComponentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
