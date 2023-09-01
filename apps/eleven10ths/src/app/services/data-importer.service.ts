/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as excelhandler from 'xlsx';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BasicAppInfoHandlerService } from './basic-app-info-handler.service';

@Injectable({
  providedIn: 'root',
})
export class DataImporterService {
  //Properties
  workbook: excelhandler.WorkBook = { SheetNames: [], Sheets: {} };

  // Constructor
  constructor(
    private firestore: AngularFirestore,
    private basicInfo: BasicAppInfoHandlerService
  ) {}

  /*****************     Functions needed to convert files to Workbooks and analyse imports    *********************/
  async analyseImports(file: File) {
    const workbookData: workbookData = {
      name: '',
      size: 0,
      file: { SheetNames: [], Sheets: {} },
    };
    workbookData['name'] = file.name;
    workbookData['size'] = file.size / 1024;
    workbookData['file'] = await this.getWorkbook(file);
    return workbookData;
  }

  async getWorkbook(file: File): Promise<excelhandler.WorkBook> {
    await this.covertFileToWorkbook(file);
    return this.workbook;
  }

  covertFileToWorkbook(file: File): Promise<void> {
    return new Promise<void>(
      (resolve) => {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (event: any) => {
          const binstring: string = event.target.result;
          this.workbook = excelhandler.read(binstring, {
            type: 'binary',
          });
          resolve();
        };
      } /*Reject process goes here*/
    );
  }

  /*****************************     Functions needed to import to Firebase    *********************************/
  /*********************  Main function  ******************************/
  async importWorksheet(
    worksheet: excelhandler.WorkSheet,
    source: string,
    sport: string
  ): Promise<importResult> {
    let importResult: importResult = {
      sport: '',
      country: '',
      league: '',
      season: '',
      results: 0,
    };
    const matrix = this.covertWorksheetToMatrix(worksheet);
    const listOfResults = this.getListOfResults(matrix);
    if (listOfResults.length > 0) {
      const importObject = await this.getObjectForImport(
        listOfResults,
        source,
        sport
      );
      const docName =
        importObject.sport +
        '-' +
        importObject.country +
        '-' +
        importObject.league +
        '-' +
        importObject.season;
      await this.postImportObject(importObject, 'Results', docName);
      importResult = {
        sport: importObject.sport,
        country: importObject.country,
        league: importObject.league,
        season: importObject.season,
        results: importObject.results.length,
      };
    }
    return importResult;
  }

  /*********************  covertWorksheetToMatrix  ******************************/
  covertWorksheetToMatrix(worksheet: excelhandler.WorkSheet): any[][] {
    return excelhandler.utils.sheet_to_json(worksheet, { header: 1 });
  }

  /*********************  getListOfResults  ******************************/
  getListOfResults(matrix: any[][]): result[] {
    const headerList = this.getHeaders(matrix[0]);
    const listOfResults: result[] = [];
    for (let rowNum = 1; rowNum < matrix.length; rowNum++) {
      const result = this.getResultObject(headerList, matrix[rowNum]);
      if (result !== null) {
        listOfResults.push(result);
      }
    }
    return listOfResults;
  }

  getHeaders(matrix: any[]) {
    const headerList = [];
    for (let i = 0; i < matrix.length; i++) {
      headerList.push(matrix[i]);
    }
    return headerList;
  }

  getResultObject(headerList: string[], matrixRow: any[]): any {
    // Only proceed is row's first cell is not empty
    if (matrixRow[0] !== undefined) {
      const result: result = { Div: '', Date: 0 };
      for (let colNum = 0; colNum < matrixRow.length; colNum++) {
        const currentKey: string = headerList[colNum];
        // If the cell has content add to object or else add empty string ''
        if (matrixRow[colNum] !== undefined) {
          result[currentKey] = matrixRow[colNum];
        } else {
          result[currentKey] = '';
        }
      }
      return result;
    } else {
      return null;
    }
  }

  /*********************  getObjectForImport  ******************************/
  async getObjectForImport(
    listOfResults: result[],
    source: string,
    sport: string
  ): Promise<seasonResultsObject> {
    // Get DivCode from first result in list and then call data from DB
    const divCode: string = listOfResults[0].Div;
    const divCodeData = await this.getDivCodeData(divCode, source);
    // Get min and max date
    const season = this.getDateParameters(listOfResults);
    const importObject: seasonResultsObject = {
      sport: sport,
      country: String(divCodeData['country']),
      league: String(divCodeData['league']),
      season: season,
      results: listOfResults,
    };
    return importObject;
  }

  async getDivCodeData(DivCode: string, source: string): Promise<divCode> {
    const divCodes: any = await this.basicInfo.getDivCodeData();
    const divCodesFromSource: { [key: string]: any } = divCodes[source];
    return divCodesFromSource[DivCode];
  }

  getDateParameters(listOfResults: result[]): string {
    let maxdate = 0;
    let mindate = 99999999;
    for (let resultNum = 0; resultNum < listOfResults.length; resultNum++) {
      const resultDate = listOfResults[resultNum].Date;
      if (resultDate < mindate) {
        mindate = resultDate;
      }
      if (resultDate > maxdate) {
        maxdate = resultDate;
      }
    }
    return (
      this.getYearFromExcelSerial(mindate) +
      '-' +
      this.getYearFromExcelSerial(maxdate)
    );
  }

  getYearFromExcelSerial(serial: number) {
    const date = new Date(Math.round((serial - 25569) * 86400 * 1000));
    return date.getFullYear();
  }

  /*********************  postImportObject  ******************************/
  postImportObject(
    importObject: object,
    collection: string,
    docName: string
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      this.firestore.collection(collection).doc(docName).set(importObject);
      resolve();
    });
  }

  async updateAvaliableResults(listOfImportResults: importResult[]) {
    // Get current document (if no document set object as empty)
    let importObject: resultIndex = await this.basicInfo.getAvaliableResults();
    if (importObject === undefined) {
      importObject = {};
    }
    // Upate the current document
    for (let iR = 0; iR < listOfImportResults.length; iR++) {
      if (importObject[listOfImportResults[iR].sport] === undefined) {
        importObject[listOfImportResults[iR].sport] = {};
      }
      if (
        importObject[listOfImportResults[iR].sport][
          listOfImportResults[iR].country
        ] === undefined
      ) {
        importObject[listOfImportResults[iR].sport][
          listOfImportResults[iR].country
        ] = {};
      }
      if (
        importObject[listOfImportResults[iR].sport][
          listOfImportResults[iR].country
        ][listOfImportResults[iR].league] === undefined
      ) {
        importObject[listOfImportResults[iR].sport][
          listOfImportResults[iR].country
        ][listOfImportResults[iR].league] = {};
      }
      if (
        importObject[listOfImportResults[iR].sport][
          listOfImportResults[iR].country
        ][listOfImportResults[iR].league][listOfImportResults[iR].season] ===
        undefined
      ) {
        importObject[listOfImportResults[iR].sport][
          listOfImportResults[iR].country
        ][listOfImportResults[iR].league][listOfImportResults[iR].season] =
          listOfImportResults[iR].results;
      }
    }
    // Write the updated document to DB
    await this.postImportObject(
      importObject,
      'ResultIndices',
      'AvaliableResults'
    );
  }
}
/************************************** Required interfaces and objects ********************************************* */
export interface workbookData {
  name: string;
  size: number;
  file: excelhandler.WorkBook;
}

export interface result {
  [key: string]: any;
  Div: string;
  Date: number;
}

export interface seasonResultsObject {
  sport: string;
  country: string;
  league: string;
  season: string;
  results: result[];
}

export interface divCode {
  [divCode: string]: { country: string; league: string };
}

export interface importResult {
  sport: string;
  country: string;
  league: string;
  season: string;
  results: number;
}

export interface resultIndex {
  [sport: string]: {
    [country: string]: {
      [league: string]: {
        [season: string]: number;
      };
    };
  };
}
