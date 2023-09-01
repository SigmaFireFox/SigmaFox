import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBasketItemDialogComponent } from './delete-basket-item-dialog.component';

describe('DeleteBasketItemDialogComponent', () => {
  let component: DeleteBasketItemDialogComponent;
  let fixture: ComponentFixture<DeleteBasketItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBasketItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBasketItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
