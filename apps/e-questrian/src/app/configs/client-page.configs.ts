import { ClientPageViewState as ViewState } from '../enums/viewstates.enum';
import {
  MenuPageConfig,
  GeneralItem,
  GeneralItemsListPageConfig,
} from '../interfaces/common-page-configs.interface';

export const ClientMenuPageConfig = {
  header: '',
  subHeader: 'Clients Menu',
  menu: [
    {
      display: 'View clients',
      viewState: ViewState.CLIENT_LIST,
    },
    {
      display: 'Add new client',
      viewState: ViewState.NEW_CLIENT,
    },
  ],
} as MenuPageConfig;

export const ClientListPageConfig = {
  header: 'Clients',
  columns: [
    { content: 'Client', widthFactor: 3 },
    { content: 'Email', widthFactor: 5 },
    { content: 'Contact', widthFactor: 3 },
  ],
  isVoidToggable: true,
  items: {} as GeneralItem,
} as GeneralItemsListPageConfig;

export const ViewClientsMenuConfig = {
  header: '',
  subHeader: '',
  menu: [
    {
      display: 'Add new client',
      viewState: ViewState.NEW_CLIENT,
    },
    { display: 'Back to Client Menu', viewState: ViewState.MAIN },
  ],
} as MenuPageConfig;
