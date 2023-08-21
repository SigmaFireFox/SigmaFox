import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsScreen } from './contact-details.screen';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsScreen;
  let fixture: ComponentFixture<ContactDetailsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDetailsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
