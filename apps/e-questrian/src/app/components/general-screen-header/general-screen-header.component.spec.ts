import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralScreenHeaderComponent } from './general-screen-header.component';

describe('GeneralScreen', () => {
  let component: GeneralScreenHeaderComponent;
  let fixture: ComponentFixture<GeneralScreenHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralScreenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
