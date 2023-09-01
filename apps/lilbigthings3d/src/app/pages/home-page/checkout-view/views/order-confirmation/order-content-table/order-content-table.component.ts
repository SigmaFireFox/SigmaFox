import { Component, HostListener, Input, OnInit } from '@angular/core';
import { BasketItem } from 'src/app/pages/home-page/basket-view/basket-view.component';

@Component({
  selector: 'app-order-content-table',
  templateUrl: './order-content-table.component.html',
  styleUrls: ['./order-content-table.component.scss'],
})
export class OrderContentTableComponent implements OnInit {
  @Input() basketContent: BasketItem[] = [];
  @Input() orderTotal = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  isMobileView = false;

  async ngOnInit(): Promise<void> {
    this.determineView();
  }

  private determineView() {
    this.isMobileView = window.innerWidth < 400;
  }
}
