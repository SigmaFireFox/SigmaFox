import {
  Component,
  Input,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-selector-table',
  templateUrl: './selector-table.component.html',
  styleUrls: ['./selector-table.component.css'],
})
export class SelectorTableComponent implements OnInit {
  // Properties
  proceed = false;
  selections: selection[] = [];
  userWarning = false;

  //Inputs
  @Input() singleSource!: boolean;
  @Input() selectedSource!: string;
  @Input() singleSport!: boolean;
  @Input() selectedSport!: string;
  @Input() fileNames!: string[];
  @Input() availableSources!: string[];
  @Input() availableSports!: string[];
  @Output() process: EventEmitter<any> = new EventEmitter();

  // Constructor
  constructor(private elem: ElementRef) {}

  readyToProceed() {
    if (this.isFormComplete()) {
      this.buildSelections();
      this.process.emit(this.selections);
    } else {
      this.setUserWarning(true)
    }
  }

  isFormComplete(): boolean {
    let testPassed = true;
    const elements = this.elem.nativeElement.querySelectorAll('select');
    elements.forEach((element: { value: string }) => {
      if (
        element.value === 'Select Source' ||
        element.value === 'Select Sport'
      ) {
        testPassed = false;
      }
    });
    return testPassed;
  }

  setUserWarning(state: boolean) {
    this.userWarning = state
  }

  buildSelections() {
    // Get selections from form
    let selectorData: string[] = [];
    const elements = this.elem.nativeElement.querySelectorAll('select');
    elements.forEach((element: { value: string }) => {
      selectorData.push(element.value);
    });

    // Populate the Selection List
    for (let fileNum = 0; fileNum < this.fileNames.length; fileNum++) {
      // Cater for three cases
      if (!this.singleSource && !this.singleSport) {
        const fileInfo: selection = {
          filename: this.fileNames[fileNum],
          source: selectorData[fileNum * 2],
          sport: selectorData[fileNum * 2 + 1],
        };
        this.selections.push(fileInfo);
      } else {
        if (!this.singleSource) {
          const fileInfo: selection = {
            filename: this.fileNames[fileNum],
            source: selectorData[fileNum],
            sport: this.selectedSport,
          };
          this.selections.push(fileInfo);
        }
        if (!this.singleSport) {
          const fileInfo: selection = {
            filename: this.fileNames[fileNum],
            source: this.selectedSource,
            sport: selectorData[fileNum],
          };
          this.selections.push(fileInfo);
        }
      }
    }
  }

  ngOnInit() {
    this.availableSources.unshift('Select Source');
    this.availableSports.unshift('Select Sport');
  }
}

export interface selection {
  filename: string;
  source: string;
  sport: string;
}
