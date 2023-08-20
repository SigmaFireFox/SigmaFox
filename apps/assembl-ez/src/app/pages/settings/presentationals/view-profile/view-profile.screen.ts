import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpansionPanelContentType } from 'app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'app/interfaces/expansion-table.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { EntityType } from 'app/enums/form.eum';
import { DetailPresentationLine } from 'app/interfaces/detail-presentation-component';

@Component({
  selector: 'app-view-profile-screen',
  templateUrl: './view-profile.screen.html',
  styleUrls: ['./view-profile.screen.scss'],
})
export class ViewProfileScreen implements OnInit {
  @Input() profile: { [key: string]: any } = {};
  @Output() viewStateSelected = new EventEmitter<number>();

  expansionPanelConfig: ExpansionPanelConfig[] = [];

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Back to settigs menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.setUpScreen();
  }

  onRequestToEdit(panelName: string) {
    switch (panelName) {
      case 'basicDetails': {
        this.viewStateSelected.emit(ViewState.EDIT_BASICS);
        return;
      }
      case 'businessDetails': {
        this.viewStateSelected.emit(ViewState.EDIT_BUS_BASICS);
        return;
      }
      case 'businessContacts': {
        this.viewStateSelected.emit(ViewState.EDIT_BUS_CONTACTS);
        return;
      }
    }
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }

  private setUpScreen() {
    this.addBasics();
    this.addBusinessDetail();
    this.addBusinessContactDetail();
  }

  private addBasics() {
    let basicDetails: ExpansionPanelConfig = {
      panelName: 'basicDetails',
      title: 'Basics details',
      contentType: ExpansionPanelContentType.DETAIL,
      optionToEdit: true,
      detailPresentationContent: {
        title: '',
        inExpansionPanel: true,
        lines: [
          {
            header: 'First name',
            detail: this.profile['firstName'],
            oneliner: true,
          },
          {
            header: 'Last name',
            detail: this.profile['lastName'],
            oneliner: true,
          },
          {
            header: 'Email',
            detail: this.profile['email'],
            oneliner: true,
          },
          {
            header: 'Contact number',
            detail: this.profile['contactNumber'],
            oneliner: true,
          },
        ],
      },
    };
    this.expansionPanelConfig.push(basicDetails);
  }

  private addBusinessDetail() {
    let entityType = '';
    switch (parseInt(this.profile['entityType'])) {
      case EntityType.SOLE_PROPRIETOR: {
        entityType = 'Sole proprietor';
        break;
      }
      case EntityType.REGISTERED_ENTITY: {
        entityType = 'Registered business';
        break;
      }
    }

    let businessDetails: ExpansionPanelConfig = {
      panelName: 'businessDetails',
      title: 'Business details',
      contentType: ExpansionPanelContentType.DETAIL,
      optionToEdit: true,
      detailPresentationContent: {
        title: '',
        inExpansionPanel: true,
        lines: [
          {
            header: 'Entity type',
            detail: entityType,
            oneliner: true,
          },
        ],
      },
    };

    if (this.profile['legalName']) {
      businessDetails.detailPresentationContent?.lines.push({
        header: 'Legal name',
        detail: this.profile['legalName'],
        oneliner: true,
      });
    }

    if (this.profile['tradingName']) {
      businessDetails.detailPresentationContent?.lines.push({
        header: 'Trading name',
        detail: this.profile['tradingName'],
        oneliner: true,
      });
    }
    this.expansionPanelConfig.push(businessDetails);
  }

  private addBusinessContactDetail() {
    let businessContactDetails: ExpansionPanelConfig = {
      panelName: 'businessContacts',
      title: 'Business contacts',
      contentType: ExpansionPanelContentType.DETAIL,
      optionToEdit: true,
      detailPresentationContent: {
        title: '',
        inExpansionPanel: true,
        lines: [
          {
            header: 'Email',
            detail: this.profile['companyEmail'] || 'None',
            oneliner: true,
          },
          {
            header: 'Contact number',
            detail: this.profile['companyContactNumber'] || 'None',
            oneliner: true,
          },
        ] as DetailPresentationLine[],
      },
    };

    if (this.profile['isPrimaryContact']) {
      businessContactDetails.detailPresentationContent?.lines.push({
        header: 'Website',
        detail: 'Website',
        oneliner: true,
        isLink: true,
        linkAddress: this.profile['companyWebsite'],
      });
    }

    if (this.profile['isPrimaryContact']) {
      businessContactDetails.detailPresentationContent?.lines.push({
        header: 'Business primary contact',
        detail: 'You',
        oneliner: false,
      });
    } else {
      businessContactDetails.detailPresentationContent?.lines.push(
        {
          header: 'Business primary contact',
          detail: '',
          oneliner: true,
        },
        {
          header: 'First name',
          detail: this.profile['primaryContactFirstName'],
          oneliner: true,
        },
        {
          header: 'Last name',
          detail: this.profile['primaryContactLastName'],
          oneliner: true,
        },
        {
          header: 'Email',
          detail: this.profile['primaryContactEmail'],
          oneliner: true,
        },
        {
          header: 'Contact number',
          detail: this.profile['primaryContactContactumber'],
          oneliner: true,
        }
      );
    }
    this.expansionPanelConfig.push(businessContactDetails);
  }
}
