import { Component } from '@angular/core';
import { QuotePageViewState as ViewState } from '../../../app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from '../../../app/interfaces/menu-screen.interface';
import {
  QuoteParams,
  QuoteResponse,
  QuotesService,
} from '../../../app/services/quotes.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-quotes-page',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class QuotesPage {
  viewState = ViewState;
  currentViewState: ViewState = ViewState.PRODUCT_SELECT;
  quoteResponse: QuoteResponse | undefined;
  quoteParams = {} as { [key: string]: string };
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
    },
  ];

  constructor(private quotesService: QuotesService) {}

  onProductSelectFormSubmitted(formValue: unknown) {
    this.quoteParams = formValue as { [key: string]: string };
    this.currentViewState = ViewState.PRODUCT_MEASUREMENTS;
  }

  onProductMeasurementFormSubmitted(formValue: { [key: string]: string }) {
    this.quoteParams = { ...this.quoteParams, ...formValue };
    this.setSecondaryDependacies();
    this.currentViewState = ViewState.QUOTE_PARAMETERS;
  }

  onQuoteParametersFormSubmitted(formValue: { [key: string]: string }) {
    this.quoteParams = { ...this.quoteParams, ...formValue };
    this.quoteResponse = this.quotesService.generateQuote(
      this.quoteParams as unknown as QuoteParams
    );
    this.currentViewState = ViewState.RESULTS;
  }

  private setSecondaryDependacies() {
    const projection = parseInt(this.quoteParams['projection']) / 1000;
    const width = parseInt(this.quoteParams['width']) / 1000;

    this.quoteParams['area'] = (projection * width).toString();
    this.quoteParams['perimeter'] = ((projection + width) * 2).toString();
  }
}
