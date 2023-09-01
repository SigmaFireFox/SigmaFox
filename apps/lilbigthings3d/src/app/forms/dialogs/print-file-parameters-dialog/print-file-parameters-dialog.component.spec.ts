import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFileParametersDialogComponent } from './print-file-parameters-dialog.component';

describe('PrintFileParametersDialogComponent', () => {
  let component: PrintFileParametersDialogComponent;
  let fixture: ComponentFixture<PrintFileParametersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintFileParametersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintFileParametersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
