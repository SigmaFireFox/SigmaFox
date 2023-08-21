import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header-component',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() header: string = '';
  constructor() {}

  ngOnInit(): void {}
}
