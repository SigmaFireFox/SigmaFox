import { KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  ValuationsFinancialHistory,
  ValuationsFinancialHistoryYear,
} from 'app/~global-interfaces/valuations.interface';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: {}): any {
    return Object.keys(value);
  }
}

@Component({
  selector: 'app-financial-history-form',
  templateUrl: './financial-history-form.component.html',
  styleUrls: ['./financial-history-form.component.scss'],
})
export class FinancialHistoryFormComponent {
  @Input() valuationFinancialHistory: ValuationsFinancialHistory = {
    data: [],
  };
  @Input() updatedDataRequested: Observable<void> | undefined;

  private dataRequestSubscription: Subscription | undefined;

  financialHistory = this.formBuilder.group({
    financialHistoryArray: this.formBuilder.array([]),
  }) as FormGroup;

  formLineTitles = [
    'Revenue',
    'Cost of Sales',
    'Operating Costs',
    'Other Income',
    'Interet Expense',
    'Interest Income',
    'Taxation',
  ];

  originalOrder = (
    a: KeyValue<string, FormGroup>,
    b: KeyValue<string, FormGroup>
  ): number => {
    return 0;
  };

  constructor(private formBuilder: FormBuilder) {}

  get financialHistoryArray() {
    return this.financialHistory.get('financialHistoryArray') as FormArray;
  }

  getFinancialHistoryArray() {
    return this.financialHistoryArray.controls as FormGroup[];
  }

  ngOnInit() {
    this.dataRequestSubscription = this.updatedDataRequested!.subscribe(() =>
      this.submittedUpdatedData()
    );

    const financialHistoryYear: FormGroup = this.formBuilder.group({
      revenue: ['', Validators.required],
      costOfSales: ['', Validators.required],
      operatingExpenses: ['', Validators.required],
      otherIncome: ['', Validators.required],
      interestExpense: ['', Validators.required],
      interestIncome: ['', Validators.required],
      taxation: ['', Validators.required],
    });

    for (let i = 0; i < 3; i++) {
      this.financialHistoryArray.push(financialHistoryYear);
    }
  }

  private submittedUpdatedData() {}

  ngOnDestroy() {
    this.dataRequestSubscription!.unsubscribe();
  }
}
