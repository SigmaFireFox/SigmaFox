import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientPageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { GeneralItem } from 'src/app/interfaces/common-page-configs.interface';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ClientsPage } from './clients.page';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { ClientsService } from 'src/app/services/clients/clients.service';

describe('ClientsPage', () => {
  let component: ClientsPage;
  let fixture: ComponentFixture<ClientsPage>;

  const mockClientID = 2;
  const mockClient = { displayName: 'Bob' } as ClientDetail;
  const mockClients = {
    1: { displayName: 'Allen' } as ClientDetail,
    2: mockClient,
  } as Clients;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ClientsPage, GeneralScreenHeaderComponent, MenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('switchViewState', () => {
    it('should set currentViewState to the provided viewstate', () => {
      // Act
      component.switchViewState(ViewState.MAIN);

      // Assert
      expect(component.currentViewState).toBe(ViewState.MAIN);

      // Act
      component.switchViewState(ViewState.VIEW);

      // Assert
      expect(component.currentViewState).toBe(ViewState.VIEW);
    });

    describe('given provide ViewState is ViewState.VIEW', () => {
      it('should call setClientList and set clientListPageConfig.items', () => {
        // Assemble
        const mockClientList = {
          1: [{ content: 'A Client name' }, { content: 'A client email' }],
          2: [{ content: 'B Client name' }, { content: 'B client email' }],
        } as GeneralItem;
        let clientListSpy = spyOn(
          TestBed.inject(ClientsService),
          'setClientList'
        ).and.returnValue(mockClientList);

        // Act
        component.switchViewState(ViewState.VIEW);

        // Assert
        expect(clientListSpy).toHaveBeenCalled();
        expect(component.clientListPageConfig.items).toEqual(mockClientList);
      });
    });
  });

  describe('viewClient', () => {
    let clientListSpy: jasmine.Spy;

    beforeEach(() => {
      // Assemble
      clientListSpy = spyOnProperty(
        TestBed.inject(ClientsService),
        'clients'
      ).and.returnValue(mockClients);
    });

    it('should call clientService.clients and set clients', () => {
      // Act
      component.viewClient(mockClientID);

      // Assert
      expect(clientListSpy).toHaveBeenCalled();
      expect(component.clients).toEqual(mockClients);
    });

    it('should set currentClient based on clientService.clients', () => {
      // Act
      component.viewClient(mockClientID);

      // Assert
      expect(component.currentClient).toEqual(mockClient);
    });

    it('should set currentViewState to ViewState.CLIENT_DETAIL', () => {
      // Act
      component.viewClient(mockClientID);

      // Assert
      expect(component.currentViewState).toBe(ViewState.CLIENT_DETAIL);
    });
  });

  describe('addClient', () => {
    it('should call clientService.addClient with the client received', () => {
      // Assemble
      let clientSpy = spyOn(TestBed.inject(ClientsService), 'addClient');

      // Act
      component.addClient(mockClient);

      // Assert
      expect(clientSpy).toHaveBeenCalled();
    });

    it('should call clientService.clients and set clients', () => {
      let clientListSpy = spyOnProperty(
        TestBed.inject(ClientsService),
        'clients'
      ).and.returnValue(mockClients);

      // Act
      component.addClient(mockClient);

      // Assert
      expect(clientListSpy).toHaveBeenCalled();
      expect(component.clients).toEqual(mockClients);
    });
  });

  describe('editClient', () => {
    it('should call clientService.editClient with the old and new client details', () => {
      // Assemble
      let clientSpy = spyOn(TestBed.inject(ClientsService), 'editClient');

      // Act
      component.viewClient(mockClientID);
      component.editClient(mockClient);

      // Assert
      expect(clientSpy).toHaveBeenCalledOnceWith(
        component.currentClient,
        mockClient
      );
    });

    it('should call clientService.clients and set clients', () => {
      let clientListSpy = spyOnProperty(
        TestBed.inject(ClientsService),
        'clients'
      ).and.returnValue(mockClients);

      // Act
      component.editClient(mockClient);

      // Assert
      expect(clientListSpy).toHaveBeenCalled();
      expect(component.clients).toEqual(mockClients);
    });
  });
});
