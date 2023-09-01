import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/materials/material.service';
import {
  MaterialColour,
  MaterialColourMapping,
  MaterialInput,
  MaterialTypeDensityMapping,
  MeasurementBasis,
} from '../material-schedule/material-schedule.component';

export interface MaterialSchedule {
  [key: string]: MaterialSummary;
}

export interface MaterialSummary {
  stockOnHand: number;
  carryingCost: number;
  costPerUnit: number;
  colors: Record<string, ColourSummary>;
}

export interface ColourSummary {
  stockOnHand: number;
  carryingCost: number;
  costPerUnit: number;
  margin: number;
  roundedToNearest: number;
}

@Component({
  selector: 'app-material-pricing-schedule',
  templateUrl: './material-pricing-schedule.component.html',
  styleUrls: ['./material-pricing-schedule.component.scss'],
})
export class MaterialPricingScheduleComponent implements OnInit {
  panelOpenState = false;

  materialSchedule: MaterialSchedule = {};
  materialColour = Object.values(MaterialColour);
  materialColourMapping = MaterialColourMapping;

  constructor(private readonly materialService: MaterialService) {}

  ngOnInit() {
    this.generateCostSummary();
  }

  private async generateCostSummary() {
    const allMaterialInputs =
      await this.materialService.getAllNewMaterialInputs();

    allMaterialInputs.forEach((materialInput) => {
      const stockInHandDelta =
        materialInput.measurementBasis === MeasurementBasis.Length
          ? materialInput.qtyPerUnit * materialInput.qtyUnit
          : this.getLengthFromWeight(materialInput);
      const carryValueDelta = materialInput.qtyUnit * materialInput.costPerUnit;

      const isMaterialTypeInSchedule =
        materialInput.materialType in this.materialSchedule;

      if (!isMaterialTypeInSchedule) {
        this.materialSchedule[materialInput.materialType] = {
          stockOnHand: 0,
          carryingCost: 0,
          costPerUnit: 0,
          colors: {} as Record<MaterialColour, ColourSummary>,
        };
      }

      this.materialSchedule[materialInput.materialType].stockOnHand +=
        stockInHandDelta;
      this.materialSchedule[materialInput.materialType].carryingCost +=
        carryValueDelta;
      this.materialSchedule[materialInput.materialType].costPerUnit =
        this.materialSchedule[materialInput.materialType].carryingCost /
        this.materialSchedule[materialInput.materialType].stockOnHand;

      const isColourInMaterialTypeObject =
        materialInput.materialColour in
        this.materialSchedule[materialInput.materialType].colors;

      if (!isColourInMaterialTypeObject) {
        this.materialSchedule[materialInput.materialType].colors[
          this.materialColourMapping[materialInput.materialColour].name
        ] = {
          stockOnHand: 0,
          carryingCost: 0,
          costPerUnit: 0,
          margin: 0,
          roundedToNearest: 5,
        };
      }
      this.materialSchedule[materialInput.materialType].colors[
        materialInput.materialColour
      ].stockOnHand += stockInHandDelta;
      this.materialSchedule[materialInput.materialType].colors[
        materialInput.materialColour
      ].carryingCost += carryValueDelta;
      this.materialSchedule[materialInput.materialType].colors[
        materialInput.materialColour
      ].costPerUnit =
        this.materialSchedule[materialInput.materialType].colors[
          materialInput.materialColour
        ].carryingCost /
        this.materialSchedule[materialInput.materialType].colors[
          materialInput.materialColour
        ].stockOnHand;
    });
  }

  private getLengthFromWeight(materialInput: MaterialInput): number {
    const cmCubed =
      (materialInput.qtyPerUnit * materialInput.qtyUnit * 10) /
      MaterialTypeDensityMapping[materialInput.materialType];
    const areaOfDiameterInCM =
      Math.PI *
      (materialInput.materialDiameter / 2 / 10) *
      (materialInput.materialDiameter / 2 / 10);
    return cmCubed / areaOfDiameterInCM;
  }
}
