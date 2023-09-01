import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderWithParametersComponent } from './file-uploader-with-parameters.component';

describe('FileUploaderWithParametersComponent', () => {
  let component: FileUploaderWithParametersComponent;
  let fixture: ComponentFixture<FileUploaderWithParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploaderWithParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploaderWithParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
