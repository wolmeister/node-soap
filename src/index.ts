import express from 'express';
import { listen as soapListen, IServices } from 'soap';
import { v4 as uuid } from 'uuid';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = express();

type AddEventRequest = {
  name: string;
  location: string;
};

type AddEventResponse = {
  id: string;
  name: string;
  location: string;
};

type SoapRequest<T> = { body: T };

type SoapResponse<T> = { result: T };

const events = [] as unknown[];

const soapServices: IServices = {
  EventService: {
    EventPort: {
      addEvent(
        args: SoapRequest<AddEventRequest>
      ): SoapResponse<AddEventResponse> {
        console.log('Add event', args);
        events.push({
          id: uuid(),
          ...args.body,
        });
        return {
          result: {
            id: uuid(),
            ...args.body,
          },
        };
      },
      listEvents() {
        console.log('listEvents');
        return {
          result: events.map(event => ({ event })),
        };
      },
    },
  },
};

const xml = readFileSync(join(__dirname, 'services.wsdl')).toString('utf-8');

app.listen(3000, () => {
  soapListen(app, '/wsdl', soapServices, xml, () => {
    console.log('App running at http://localhost:3000');
  });
});
