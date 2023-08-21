import { Component, Input, OnInit } from '@angular/core';
import { DetailPresentationConfig } from '../../../app/interfaces/detail-presentation-component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-detail-presentation-component',
  templateUrl: './detail-presentation.component.html',
  styleUrls: ['./detail-presentation.component.scss'],
})
export class DetailPresentationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() detailConfig: DetailPresentationConfig = {
    title: '',
    lines: [],
    inExpansionPanel: false,
  };
}
