import { Component } from '@angular/core';
import { PageMenuManagementService } from 'src/app/services/page-menu-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { resultIndex } from 'src/app/services/data-importer.service';

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
