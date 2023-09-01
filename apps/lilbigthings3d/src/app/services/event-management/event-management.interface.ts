import { ReplaySubject, Subject } from 'rxjs';

export interface Message {
  topic: string;
  payload: unknown;
}

export interface EventMessage<T> {
  timestamp: string;
  topic: string;
  payload: T;
}

export interface EventChannel {
  channel: string;
  topic: string;
  subject: Subject<Message>;
}

export interface ReplayEventChannel {
  channel: string;
  topic: string;
  subject: ReplaySubject<Message>;
}

export type EventCallback<T> = (eventMessage: EventMessage<T>) => void;
