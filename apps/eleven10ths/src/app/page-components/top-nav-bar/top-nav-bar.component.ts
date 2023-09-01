import { Component, OnInit } from '@angular/core';
import { BasicAppInfoHandlerService } from 'src/app/services/basic-app-info-handler.service';
import { resultIndex } from 'src/app/services/data-importer.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit {
  // Properties
  avaliableSports: string[] = [];

  // Constructor
  constructor(
    private basicInfo: BasicAppInfoHandlerService
  ) {}

  async ngOnInit(): Promise<void> {
    const avaliableResults: resultIndex =
      await this.basicInfo.getAvaliableResults();
    this.avaliableSports = Object.keys(avaliableResults);
  }
}
