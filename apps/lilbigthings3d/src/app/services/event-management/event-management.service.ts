import { Injectable } from '@angular/core';
import { filter, ReplaySubject, Subject, Subscription } from 'rxjs';
import {
  EventCallback,
  EventChannel,
  EventMessage,
  Message,
  ReplayEventChannel,
} from './event-management.interface';

@Injectable({
  providedIn: 'root',
})
export class EventManagementService {
  private readonly channels: EventChannel[];
  private readonly replayChannels: ReplayEventChannel[];

  constructor() {
    this.channels = [];
    this.replayChannels = [];
  }

  subscribe(
    channelName: string,
    topic: string,
    callback: EventCallback<unknown>,
    isReplay = false
  ): Subscription {
    if (isReplay) {
      let replaySubject = this.replayChannels.find(
        (c) => c.channel === channelName && c.topic === topic
      );

      if (!replaySubject) {
        replaySubject = {
          channel: channelName,
          topic,
          subject: new ReplaySubject<Message>(1),
        };
        this.replayChannels.push(replaySubject);
      }

      const createdSubscription = replaySubject.subject
        .asObservable()
        .pipe()
        .subscribe(async (message) => {
          const eventMessage: EventMessage<unknown> = {
            timestamp: new Date(Date.now()).toLocaleString(),
            topic,
            payload: message.payload,
          };

          callback(eventMessage);
        });

      return createdSubscription;
    } else {
      let channel = this.channels.find((c) => c.channel === channelName);

      if (!channel) {
        channel = {
          channel: channelName,
          topic,
          subject: new Subject<Message>(),
        };
        this.channels.push(channel);
      }

      const createdSubscription = channel.subject
        .asObservable()
        .pipe(filter((item: Message) => item.topic === topic))
        .subscribe((message) => {
          const eventMessage: EventMessage<unknown> = {
            timestamp: new Date(Date.now()).toLocaleString(),
            topic,
            payload: message.payload,
          };

          callback(eventMessage);
        });

      return createdSubscription;
    }
  }

  publish(channelName: string, topic: string, payload?: unknown): void {
    let channel = this.channels.find((c) => c.channel === channelName);

    if (!channel) {
      channel = {
        channel: channelName,
        topic,
        subject: new Subject<Message>(),
      };
      this.channels.push(channel);
    }

    if (topic) {
      const message: Message = {
        topic,
        payload,
      };

      channel.subject.next(message);
    }

    let replaySubject = this.replayChannels.find(
      (replayChannel: ReplayEventChannel) =>
        replayChannel.channel === channelName && replayChannel.topic === topic
    );

    if (!replaySubject) {
      replaySubject = {
        channel: channelName,
        topic,
        subject: new ReplaySubject<Message>(1),
      };
      this.replayChannels.push(replaySubject);
    }

    if (topic) {
      const message: Message = {
        topic,
        payload,
      };

      replaySubject.subject.next(message);
    }
  }
}
