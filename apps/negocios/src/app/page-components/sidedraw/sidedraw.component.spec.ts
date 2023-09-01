import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedrawComponent } from './sidedraw.component';

describe('SidedrawComponent', () => {
  let component: SidedrawComponent;
  let fixture: ComponentFixture<SidedrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidedrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidedrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
