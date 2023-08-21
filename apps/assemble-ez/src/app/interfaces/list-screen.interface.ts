export interface ListConfig {
  isInExpansionTable: boolean;
  title: string;
  headers: ListHeaderConfig[];
  lines: string[][];
}

export interface ListHeaderConfig {
  widthFactor: number;
  content: string;
}
