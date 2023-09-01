import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTableComponent } from './selector-table.component';

describe('SelectorTableComponent', () => {
  let component: SelectorTableComponent;
  let fixture: ComponentFixture<SelectorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
