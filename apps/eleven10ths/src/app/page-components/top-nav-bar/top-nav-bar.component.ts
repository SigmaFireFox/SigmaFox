/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { BasicAppInfoHandlerService } from '../../services/basic-app-info-handler.service';
import { resultIndex } from '../../services/data-importer.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit {
  // Properties
  avaliableSports: string[] = [];

  // Constructor
  constructor(private basicInfo: BasicAppInfoHandlerService) {}

  async ngOnInit(): Promise<void> {
    const avaliableResults: resultIndex =
      await this.basicInfo.getAvaliableResults();
    this.avaliableSports = Object.keys(avaliableResults);
  }
}
