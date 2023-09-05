/* eslint-disable @angular-eslint/use-lifecycle-interface */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { Button, ButtonType } from '../../interfaces/widgets.interface';

/* eslint-disable @angular-eslint/component-selector */
export interface CarouselOption {
  title?: string;
  image: string;
  buttons: Button[];
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() options = [] as CarouselOption[];
  @Output() maxButtonWidth: EventEmitter<number> = new EventEmitter();

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.setNumberOfTileDisplayNumber();
    this.maxButtonWidth.emit(document.getElementById('button-0')?.offsetWidth);
  }

  buttonType = ButtonType;
  tilesInFocus: number[] = [];

  private numberOfDisplayTiles = 0;
  private firstDisplayTileNumber = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setNumberOfTileDisplayNumber();
  }

  ngAfterViewInit() {
    this.maxButtonWidth.emit(document.getElementById('button-0')?.offsetWidth);
  }

  onArrowClick(goForward: boolean) {
    this.setFirstDisplayTileNumber(goForward);
    this.setCarouselOptionsArray();
  }

  onButtonClick(button: Button) {
    if (!button.url && !button.internalUrl) return;
    if (button.internalUrl) {
      this.router.navigate([button.url]);
    } else {
      window.open(button.url, '_blank');
    }
  }

  private setNumberOfTileDisplayNumber() {
    this.numberOfDisplayTiles =
      window.innerWidth < 900 ? 1 : window.innerWidth < 1500 ? 3 : 5;
    this.setCarouselOptionsArray();
  }

  private setCarouselOptionsArray() {
    this.tilesInFocus = [];
    const lastDisplayTileNumber =
      this.firstDisplayTileNumber + this.numberOfDisplayTiles - 1;
    for (
      let i = this.firstDisplayTileNumber;
      i < lastDisplayTileNumber + 1;
      i++
    ) {
      this.tilesInFocus.push(
        i < this.options.length ? i : i - this.numberOfDisplayTiles
      );
    }
  }

  private setFirstDisplayTileNumber(goForward: boolean) {
    console.log(this.firstDisplayTileNumber);
    this.firstDisplayTileNumber = goForward
      ? this.firstDisplayTileNumber + 1
      : this.firstDisplayTileNumber - 1;
    console.log(this.firstDisplayTileNumber);

    if (goForward && this.firstDisplayTileNumber === this.options.length) {
      this.firstDisplayTileNumber = 0;
    }
    console.log(this.firstDisplayTileNumber);

    if (!goForward && this.firstDisplayTileNumber < 0) {
      this.firstDisplayTileNumber = this.options.length - 1;
    }
    console.log(this.firstDisplayTileNumber);
  }
}
