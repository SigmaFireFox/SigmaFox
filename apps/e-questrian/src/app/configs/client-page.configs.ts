import {
  GeneralItem,
  GeneralItemsListPageConfig,
  MenuPageConfig,
} from '../interfaces/common-page-configs.interface';
import { ClientPageViewState as ViewState } from 'src/app/enums/viewstates.enum';

export const ClientMenuPageConfig = {
  header: '',
  subHeader: 'Clients Menu',
  menu: [
    { display: 'View clients', viewState: ViewState.VIEW },
    { display: 'Add new client', viewState: ViewState.CLIENT_DETAIL },
  ],
} as MenuPageConfig;

export const ClientListPageConfig = {
  header: '',
  subHeader: 'Clients',
  columns: [
    { content: 'Client', widthFactor: 3 },
    { content: 'Email', widthFactor: 5 },
    { content: 'Contact', widthFactor: 3 },
  ],
  items: {} as GeneralItem,
} as GeneralItemsListPageConfig;

export const ViewClientsMenuConfig = {
  header: '',
  subHeader: '',
  menu: [{ display: 'Back to Client Menu', viewState: ViewState.MAIN }],
} as MenuPageConfig;
