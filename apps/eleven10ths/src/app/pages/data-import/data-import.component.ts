/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { BasicAppInfoHandlerService } from '../../services/basic-app-info-handler.service';
import {
  DataImporterService,
  importResult,
} from '../../services/data-importer.service';
import { selection } from './selector-table/selector-table.component';
import { workbookData } from '../../services/data-importer.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css'],
})
export class DataImportComponent implements OnInit {
  // ************************************ Constructor  *********************************************
  constructor(
    private dataService: DataImporterService,
    private basicInfo: BasicAppInfoHandlerService
  ) {}

  // ************************************ Functions  *********************************************

  // ******************** On Initialisation *********************
  // Properties
  sourcesList: string[] = [];
  sportsList: string[] = [];

  // Functions
  async ngOnInit() {
    // Get list of sources
    const sources: { List: [] } = await this.basicInfo.getList(
      'ImportDataSources'
    );
    for (let sourceNum = 0; sourceNum < sources.List.length; sourceNum++) {
      this.sourcesList.push(sources.List[sourceNum]);
    }
    // Get list of sports
    const sports: { List: [] } = await this.basicInfo.getList(
      'ImportDataSports'
    );
    for (let sourceNum = 0; sourceNum < sports.List.length; sourceNum++) {
      this.sportsList.push(sports.List[sourceNum]);
    }
  }

  // ******************** On uploading files *********************
  // Properties
  eventValue!: any;
  uploaded = false;
  assessMultipleFileUniformity = false;
  singleSource = false;
  singleSport = false;
  fileNamesList: string[] = [];

  // Functions
  async uploadEvent(event: any) {
    this.eventValue = event;
    this.uploaded = true;
    if (this.eventValue.target.files.length > 1) {
      this.assessMultipleFileUniformity = true;
    } else {
      this.singleSource = true;
      this.singleSport = true;
    }
    this.getFileNamesList(this.eventValue.target.files);
  }

  getFileNamesList(files: File[]) {
    for (
      // Go through each workbook
      let fileNum = 0;
      fileNum < files.length;
      fileNum++
    ) {
      this.fileNamesList.push(files[fileNum].name);
    }
  }

  // ********* Workflow functions for mulitple files **********
  // Properties
  selectorTableRequired = false;
  singleSourceDetermined = false;
  singleSportDetermined = false;
  selectedSource!: string;
  selectedSport!: string;
  sourceSelected = false;
  sportSelected = false;
  assessmentComplete = false;

  // Functions
  singleSourceDetermination(isSingleSource: boolean) {
    if (isSingleSource) {
      this.singleSource = true;
    } else {
      this.selectorTableRequired = true;
    }
    this.singleSourceDetermined = true;
  }

  selectSourceEvent(source: string) {
    this.selectedSource = source;
    this.sourceSelected = true;
  }

  singleSportDetermination(singleSport: boolean) {
    if (singleSport) {
      this.singleSport = true;
    } else {
      this.selectorTableRequired = true;
      this.assessmentComplete = true;
    }
    this.singleSportDetermined = true;
  }

  selectSportEvent(sport: string) {
    this.selectedSport = sport;
    this.sportSelected = true;
    this.assessmentComplete = true;
  }

  // ********************* Selector Table ***********************
  // Properties
  selections: selection[] = [];
  proceed = false;

  // Functions
  readyToProceed(selections: selection[]) {
    this.selections = selections;
    this.proceed = true;
  }

  // ********************* Analysis Process ***********************
  // Properties
  optionSelected = false;
  analysisStarted = false;
  analysisComplete = false;
  fileNum: number = 0;
  workbookData: workbookData = {
    name: '',
    size: 0,
    file: { SheetNames: [], Sheets: {} },
  };
  workbookInfo: workbookInfo = {
    name: '',
    size: 0,
    file: { SheetNames: [], Sheets: {} },
    source: '',
    sport: '',
  };
  listOfWorkbookInfo: workbookInfo[] = [];

  //Functions
  async analyseFiles() {
    this.optionSelected = true;
    this.analysisStarted = true;
    for (
      this.fileNum = 0;
      this.fileNum < this.eventValue.target.files.length;
      this.fileNum++
    ) {
      this.workbookData = await this.dataService.analyseImports(
        this.eventValue.target.files[this.fileNum]
      );
      this.workbookInfo = {
        name: '',
        size: 0,
        file: { SheetNames: [], Sheets: {} },
        source: '',
        sport: '',
      };
      this.workbookInfo.name = this.workbookData.name;
      this.workbookInfo.size = this.workbookData.size;
      this.workbookInfo.file = this.workbookData.file;
      if (
        this.eventValue.target.files.length > 1 &&
        !(this.sportSelected && this.sourceSelected)
      ) {
        this.workbookInfo.source = this.selections[this.fileNum].source;
        this.workbookInfo.sport = this.selections[this.fileNum].sport;
      } else {
        this.workbookInfo.source = this.selectedSource;
        this.workbookInfo.sport = this.selectedSport;
      }

      this.listOfWorkbookInfo.push(this.workbookInfo);
    }
    this.analysisComplete = true;
  }

  // ********************* Import Process ***********************
  // Properties
  importStarted = false;
  importComplete = false;
  listOfImportResults: importResult[] = [];

  // Functions
  importProcess(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      // Change states at start
      this.optionSelected = true;
      this.isImportingState(true);

      // Go through all files
      for (
        this.fileNum = 0;
        this.fileNum < this.eventValue.target.files.length;
        this.fileNum++
      ) {
        // Get workbook file and sport
        const file = await this.dataService.getWorkbook(
          this.eventValue.target.files[this.fileNum]
        );
        // Get source and sport
        let source: string = '';
        let sport: string = '';
        if (this.singleSource) {
          source = this.selectedSource;
        } else {
          source = this.selections[this.fileNum].source;
        }
        if (this.singleSport) {
          sport = this.selectedSport;
        } else {
          sport = this.selections[this.fileNum].sport;
        }
        await this.importFile(file, source, sport);
      }

      //Update avaliableResultsIndex
      this.dataService.updateAvaliableResults(this.listOfImportResults);

      // Change states at completion
      this.isImportingState(false);
      resolve();
    });
  }

  isImportingState(isImporting: boolean) {
    if (isImporting) {
      this.importStarted = true;
      this.importComplete = false;
    } else {
      this.importStarted = false;
      this.importComplete = true;
    }
  }

  importFile(file: any, source: string, sport: string): Promise<void> {
    return new Promise<void>(async (resolve) => {
      // Go through each sheet in workbook
      for (let sheetNum = 0; sheetNum < file.SheetNames.length; sheetNum++) {
        const sheetName = file.SheetNames[sheetNum];
        const sheet = file.Sheets[sheetName];
        const importResult: importResult =
          await this.dataService.importWorksheet(sheet, source, sport);
        if (importResult.country !== '') {
          this.listOfImportResults.push(importResult);
        }
        /* For now we will assume that all results in a single worksheet are in the same league and the league code
          will be in a column with the header name 'Div' and that the first result WILL have that object */
      }
      resolve();
    });
  }
}

interface workbookInfo extends workbookData {
  source: string;
  sport: string;
}
