import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDosPage } from './to-dos-page.component';

describe('ToDosPageComponent', () => {
  let component: ToDosPage;
  let fixture: ComponentFixture<ToDosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
