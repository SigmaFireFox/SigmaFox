import { Url } from 'url';

export interface DetailPresentationConfig {
  title: string;
  lines: DetailPresentationLine[];
  inExpansionPanel: boolean;
}

export interface DetailPresentationLine {
  header: string;
  detail: string;
  oneliner: boolean;
  isLink?: boolean;
  linkAddress?: Url;
}
