import { Injectable } from '@angular/core';
import { MaterialInput } from '../../pages/admin-page/admin-dashboard/cost-pricing-management/costs-dashboard/material-schedule/material-schedule.component';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private readonly fs: FirestoreManagementService) {}

  async getAllNewMaterialInputs(): Promise<MaterialInput[]> {
    return await this.fs.getAllMaterialInputs();
  }

  addNewMaterialInput(materialInput: MaterialInput) {
    this.fs.addMaterialInput(materialInput);
  }
}
