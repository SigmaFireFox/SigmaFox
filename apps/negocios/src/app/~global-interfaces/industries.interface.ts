export interface Industries {
  description: string;
  superSectors: SuperSector[];
}

export interface SuperSector {
  description: string;
  sectors: Sector[];
}

export interface Sector {
  description: string;
  subSectors: string[];
}
