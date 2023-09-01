import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsPage } from './contact-us.page';

describe('ContactUsComponent', () => {
  let component: ContactUsPage;
  let fixture: ComponentFixture<ContactUsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
