import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { countries } from '../../../~global-datastores/countries-datastore';
import { currencies } from '../../../~global-datastores/currencies-datastore';
import { industries } from '../../../~global-datastores/industries-datastore';
import { MonthsOfYear } from '../../../~global-enums/general.enum';
import { Countries } from 'app/~global-interfaces/counties.interface';
import { Currencies } from 'app/~global-interfaces/currencies.interface';
import {
  EstimatesBasics,
  IncompleteEstimatesBasics,
} from 'app/~global-interfaces/estimates-basics.interface';
import {
  Industries,
  Sector,
  SuperSector,
} from 'app/~global-interfaces/industries.interface';

@Component({
  selector: 'app-estimates-basics-screen',
  templateUrl: './estimates-basics.screen.html',
  styleUrls: ['./estimates-basics.screen.scss'],
})
export class EstimatesBasicsScreen implements OnInit {
  @Input() updatedDataRequested: Observable<boolean> | undefined;
  @Output() updateBasicDetails = new EventEmitter<EstimatesBasics>();
  @Output() incompleteBasicDetails = new EventEmitter<string[]>();

  dataRequestSubscription: Subscription | undefined;

  nameInputRejected: boolean = false;
  entityFYE: string = '';
  entityFinancialHistoryYears: number = 2;
  entityLastFinancialYear: number = 0;
  entityLastFinancialYearOptions: number[] = [];
  countries: Countries[] = countries;
  entityCountry: string = '';
  currencies: Currencies[] = currencies;
  entityCurrency: string = '';
  industries: Industries[] = industries;
  entityIndustry: string = '';
  showSuperSectors: boolean = false;
  superSectors: SuperSector[] = [];
  entitySuperSector: string = '';
  showSectors: boolean = false;
  sectors: Sector[] = [];
  entitySector: string = '';
  showSubSectors: boolean = false;
  subSectors: string[] = [];
  entitySubSector: string = '';

  basicDetails = this.formBuilder.group({
    targetEntityName: this.formBuilder.control(['']),
    targetEntityFYE: this.formBuilder.control(['', Validators.required]),
    targetEntityFinancialHistoryYears: this.formBuilder.control('', [
      Validators.required,
    ]),
    targetEntityLastFinancialYear: this.formBuilder.control('', [
      Validators.required,
    ]),
    targetEntityCountry: this.formBuilder.control(['', Validators.required]),
    targetEntityCurrency: this.formBuilder.control(['', Validators.required]),
    targetEntityIndustry: this.formBuilder.control(['', Validators.required]),
    targetEntitySuperSector: this.formBuilder.control([
      '',
      Validators.required,
    ]),
    targetEntitySector: this.formBuilder.control(['', Validators.required]),
    targetEntitySubSector: this.formBuilder.control(['', Validators.required]),
  });

  monthsOfYear = MonthsOfYear;
  originalOrder = (
    a: KeyValue<string, MonthsOfYear>,
    b: KeyValue<string, MonthsOfYear>
  ): number => {
    return 0;
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.entityLastFinancialYearOptions = this.setFinancialYearOptions();
    this.setSubscriptionsRequired();
  }

  onNameInputRejectedChecked() {
    this.nameInputRejected
      ? this.basicDetails.controls['targetEntityName'].setValue(
          'No name elected'
        )
      : this.basicDetails.controls['targetEntityName'].setValue('');
  }

  onIndustrySelected() {
    this.superSectors = [];
    if (this.entityIndustry) {
      this.showSuperSectors = true;
      this.entitySuperSector = '';
      this.showSectors = false;
      this.showSubSectors = false;
      this.industries.forEach((industry) => {
        if (industry.description === this.entityIndustry) {
          industry.superSectors.forEach((superSector) =>
            this.superSectors.push(superSector)
          );
        }
      });
    }
  }

  onSuperSectorSelected() {
    this.sectors = [];
    if (this.entitySuperSector) {
      this.showSectors = true;
      this.entitySector = '';
      this.showSubSectors = false;
      this.superSectors.forEach((superSector) => {
        if (superSector.description === this.entitySuperSector) {
          superSector.sectors.forEach((sector) => this.sectors.push(sector));
        }
      });
    }
  }

  onSectorSelected() {
    this.subSectors = [];
    if (this.entitySector) {
      this.showSubSectors = true;
      this.entitySubSector = '';
      this.sectors.forEach((sector) => {
        if (sector.description === this.entitySector) {
          sector.subSectors.forEach((subSector) =>
            this.subSectors.push(subSector)
          );
        }
      });
    }
  }

  private setFinancialYearOptions(): number[] {
    let financialYearOptions: number[] = [];
    const currentYear = new Date().getFullYear();
    let lastFinancialYear = currentYear;
    const currentMonth = new Date().getMonth();
    if (currentMonth === 1) {
      lastFinancialYear--;
    }
    financialYearOptions.push(lastFinancialYear);
    for (let i = 1; i < 10; i++) {
      financialYearOptions.push(lastFinancialYear - i);
    }
    return financialYearOptions;
  }

  private setSubscriptionsRequired() {
    this.dataRequestSubscription = this.updatedDataRequested!.subscribe(
      (requestScreenData) => {
        requestScreenData ? this.submitUpdate() : null;
      }
    );
  }

  private submitUpdate() {
    let acceptableForm: boolean = true;
    let incompleteDetails = {} as IncompleteEstimatesBasics;
    Object.keys(this.basicDetails.controls).forEach((key) => {
      if (key === 'targetEntityFinancialHistoryYears') {
        incompleteDetails[key as keyof IncompleteEstimatesBasics] = true;
      }
      if (key === 'targetEntityLastFinancialYear') {
        if (this.basicDetails.controls[key].value === 0) {
          acceptableForm = false;
          incompleteDetails[key as keyof IncompleteEstimatesBasics] = false;
        } else {
          incompleteDetails[key as keyof IncompleteEstimatesBasics] = true;
        }
      }
      if (
        key !== 'targetEntityFinancialHistoryYears' &&
        key !== 'targetEntityLastFinancialYear'
      ) {
        if (
          this.basicDetails.controls[key].value[0] === '' ||
          this.basicDetails.controls[key].value[0] === undefined
        ) {
          acceptableForm = false;
          incompleteDetails[key as keyof IncompleteEstimatesBasics] = false;
        } else {
          incompleteDetails[key as keyof IncompleteEstimatesBasics] = true;
        }
      }
    });
    acceptableForm
      ? this.updateBasicDetails.emit(this.basicDetails.value as EstimatesBasics)
      : this.incompleteBasicDetails.emit(
          this.compileIncompleteDetailsList(incompleteDetails)
        );
  }

  private compileIncompleteDetailsList(
    incompleteDetails: IncompleteEstimatesBasics
  ): string[] {
    let incompleteDetailsList: string[] = [];
    !incompleteDetails.targetEntityName
      ? incompleteDetailsList.push(
          'No name entered (or election to not provide one)'
        )
      : null;
    !incompleteDetails.targetEntityFYE
      ? incompleteDetailsList.push('No financial year-end month selected')
      : null;
    !incompleteDetails.targetEntityLastFinancialYear
      ? incompleteDetailsList.push('No last financial year end selected')
      : null;
    !incompleteDetails.targetEntityCountry
      ? incompleteDetailsList.push('No country selected')
      : null;
    !incompleteDetails.targetEntityCurrency
      ? incompleteDetailsList.push('No currency selected')
      : null;
    !incompleteDetails.targetEntityIndustry
      ? incompleteDetailsList.push(
          'No industry selected (and subsequent required selections)'
        )
      : !incompleteDetails.targetEntitySuperSector
      ? incompleteDetailsList.push(
          'No super sector selected (and subsequent required selections)'
        )
      : !incompleteDetails.targetEntitySector
      ? incompleteDetailsList.push(
          'No sector selected (and subsequent required selection)'
        )
      : !incompleteDetails.targetEntitySubSector
      ? incompleteDetailsList.push('No sub sector selected')
      : null;
    return incompleteDetailsList;
  }
}
