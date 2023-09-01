import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuOption {
  display: string;
  path: string;
}

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMobileView: boolean = false;
  displayMenu: boolean = true;

  readonly menuOptions: MenuOption[] = [
    { display: 'Calendar', path: '/calendar' },
    { display: 'Finances', path: '/finances' },
    { display: 'Clients', path: '/clients' },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.isMobileView) {
        this.displayMenu = false;
      }
    }
  }

  get innerWidth() {
    return window.innerWidth;
  }

  constructor(public router: Router, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.determineView();
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onMenuIconClick() {
    this.displayMenu = !this.displayMenu;
  }

  onMenuOptionClicked(path: string) {
    if (this.isMobileView) {
      this.displayMenu = false;
    }
    this.router.navigate([path]);
  }

  private determineView() {
    this.isMobileView = this.innerWidth <= 450;
    this.displayMenu = !this.isMobileView;
  }
}
