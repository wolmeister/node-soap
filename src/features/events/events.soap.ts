import { IServices } from 'soap';
import { SoapListResponse, SoapRequest, SoapResponse } from '../../shared/soap.types';
import { addEvent, listEvents } from './events.controller';
import { AddEventRequest, AddEventResponse, ListEventsResponse } from './events.types';

export const eventsSoapService: IServices = {
  EventService: {
    EventPort: {
      addEvent(args: SoapRequest<AddEventRequest>): SoapResponse<AddEventResponse> {
        console.log('SOAP - Add event', args);
        return {
          result: addEvent(args.body),
        };
      },
      listEvents(): SoapListResponse<ListEventsResponse, 'event'> {
        console.log('SOAP - List events');
        return {
          result: listEvents().map((event) => ({ event })),
        };
      },
    },
  },
};
