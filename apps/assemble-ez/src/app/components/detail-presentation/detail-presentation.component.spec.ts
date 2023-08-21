import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPresentationComponent } from './detail-presentation.component';

describe('ObjectPresentationComponent', () => {
  let component: DetailPresentationComponent;
  let fixture: ComponentFixture<DetailPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPresentationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
