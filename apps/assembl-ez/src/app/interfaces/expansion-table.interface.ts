import { ExpansionPanelContentType } from '../enums/expansion-table.enum';
import { DetailPresentationConfig } from './detail-presentation-component';
import { FormConfig } from './form-screen.interface';
import { ListConfig } from './list-screen.interface';

export interface ExpansionPanelConfig {
  panelName: string;
  title: string;
  contentType: ExpansionPanelContentType;
  description?: string;
  formContent?: FormConfig;
  listContent?: ListConfig;
  detailPresentationContent?: DetailPresentationConfig;
  optionToEdit?: boolean;
}
