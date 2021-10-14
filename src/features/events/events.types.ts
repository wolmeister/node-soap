export type Event = {
  id: string;
  name: string;
  location: string;
};

export type AddEventRequest = Omit<Event, 'id'>;

export type AddEventResponse = Event;

export type ListEventsResponse = Event[];
