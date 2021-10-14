import { v4 as uuid } from 'uuid';
import {
  AddEventRequest,
  AddEventResponse,
  Event,
  ListEventsResponse,
} from './events.types';

const events: Event[] = [];

export function addEvent(body: AddEventRequest): AddEventResponse {
  const event: Event = {
    id: uuid(),
    ...body,
  };
  events.push(event);
  return event;
}

export function listEvents(): ListEventsResponse {
  return events;
}
