/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resultIndex } from '../../services/data-importer.service';
import { PageMenuManagementService } from '../../services/page-menu-management.service';

@Component({
  selector: 'app-side-panel-menu',
  templateUrl: './side-panel-menu.component.html',
  styleUrls: ['./side-panel-menu.component.css'],
})
export class SidePanelMenuComponent {
  // Properties
  selectedSport: string = '';
  sportMenu: resultIndex = {};

  // Constructor
  constructor(
    private menuService: PageMenuManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  // Service utlisation
  getSelectedSport() {
    const routeParams = this.route.snapshot.paramMap;
    this.selectedSport = this.menuService.getSelectedSport(routeParams);
  }

  async getSubMenu() {
    (await this.menuService.getSportMenu(this.selectedSport)).subscribe(
      (sportMenu) => (this.sportMenu = sportMenu)
    );
  }

  // Intiliation
  ngOnInit() {
    this.getSelectedSport();
    this.getSubMenu();
  }
}
