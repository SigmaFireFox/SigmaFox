/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import {
  EventChannel,
  EventTopic,
} from './services/event-management/event-management.enum';
import { EventManagementService } from './services/event-management/event-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lil-big-things-3d';
  app = initializeApp(environment.firebase);
  isLoading = false;
  isSigningOut = false;

  constructor(
    private readonly eventService: EventManagementService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventService.subscribe(
      EventChannel.Product,
      EventTopic.Loading,
      (data) => {
        this.isLoading = data.payload as boolean;
        this.cd.detectChanges();
      }
    );

    this.eventService.subscribe(
      EventChannel.Auth,
      EventTopic.SignOutAttempt,
      (data) => {
        this.isSigningOut = data.payload as boolean;
        this.cd.detectChanges();
      }
    );
  }
}
