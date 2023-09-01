import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaterialInputDialogComponent } from './new-material-input-dialog.component';

describe('NewMaterialInputDialogComponent', () => {
  let component: NewMaterialInputDialogComponent;
  let fixture: ComponentFixture<NewMaterialInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMaterialInputDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMaterialInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
