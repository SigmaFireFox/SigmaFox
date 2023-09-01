import { Component, Input, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/materials/material.service';
import { Timestamp } from '@angular/fire/firestore';

export enum MaterialType {
  PLA = 'PLA',
  ABS = 'ABS',
}

export const MaterialTypeMapping: Record<MaterialType, string> = {
  [MaterialType.PLA]: 'PLA (Polylactic acid)',
  [MaterialType.ABS]: 'ABS (Acrylonitrile Butadiene Styrene)',
};

export const MaterialTypeDensityMapping: Record<MaterialType, number> = {
  [MaterialType.PLA]: 1.25,
  [MaterialType.ABS]: 1.05,
};

export enum MaterialDiameters {
  D175 = '1.75mm',
  D285 = '2.85mm',
}

export const MaterialDiametersMapping: Record<MaterialDiameters, number> = {
  [MaterialDiameters.D175]: 1.75,
  [MaterialDiameters.D285]: 2.85,
};

export enum MeasurementBasis {
  Weight = 'Weight',
  Length = 'Length',
}

export const MasurementBasisMapping: Record<MeasurementBasis, string> = {
  [MeasurementBasis.Weight]: 'Weight',
  [MeasurementBasis.Length]: 'Length',
};

export enum MaterialInputStatus {
  Ordered = 'Ordered',
  Delivered = 'Delivered',
}

export const MaterialInputStatusMapping: Record<MaterialInputStatus, string> = {
  [MaterialInputStatus.Ordered]: 'Ordered',
  [MaterialInputStatus.Delivered]: 'Delivered',
};

export enum MaterialColour {
  White = 'White',
  Pink = 'Pink',
  LightBlue = 'LightBlue',
}

export interface MaterialColourData {
  name: string;
  colourCode: string;
}

export const MaterialColourMapping: Record<MaterialColour, MaterialColourData> =
  {
    [MaterialColour.White]: { name: 'White', colourCode: '#FFFFFF' },
    [MaterialColour.Pink]: { name: 'Pink', colourCode: '#FFC0CB' },
    [MaterialColour.LightBlue]: { name: 'Light Blue', colourCode: '#ADD8E6' },
  };

export interface MaterialInput {
  purchaseDate: Date;
  supplier: string;
  materialType: MaterialType;
  materialColour: MaterialColour;
  measurementBasis: string;
  materialDiameter: number;
  qtyPerUnit: number;
  qtyUnit: number;
  costPerUnit: number;
  status: string;
}

@Component({
  selector: 'app-material-schedule',
  templateUrl: './material-schedule.component.html',
  styleUrls: ['./material-schedule.component.scss'],
})
export class MaterialScheduleComponent implements OnInit {
  @Input() materialInputs: MaterialInput[] = [];

  showNewMaterialInputDialog = false;

  constructor(private readonly materialService: MaterialService) {}

  async ngOnInit() {
    await this.getMaterialInputs();
  }

  onNewMaterialInputClick() {
    this.showNewMaterialInputDialog = true;
  }

  onNewMaterialInputDialogCancel() {
    this.showNewMaterialInputDialog = false;
  }

  handleNewMaterialInput(newMaterialInput: MaterialInput) {
    this.materialService.addNewMaterialInput(newMaterialInput);
    this.materialInputs.push(newMaterialInput);
    this.showNewMaterialInputDialog = false;
  }

  async getMaterialInputs() {
    this.materialInputs = await this.materialService.getAllNewMaterialInputs();
    for (const input of this.materialInputs) {
      input.purchaseDate = (
        input.purchaseDate as unknown as Timestamp
      ).toDate();
    }
  }
}
