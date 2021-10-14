import express from 'express';
import { listen as soapListen, IServices } from 'soap';
import { v4 as uuid } from 'uuid';
import { readFileSync } from 'fs';

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

const soapServices: IServices = {
  EventService: {
    EventPort: {
      addEvent(args: AddEventRequest): AddEventResponse {
        console.log('Add event', args);
        return {
          id: uuid(),
          ...args,
        };
      },
    },
  },
};

const xml = readFileSync(
  'C:\\Users\\Devel\\Desktop\\Projects\\School\\architecture\\task4-ts\\src\\services.wsdl'
).toString('utf-8');

app.listen(3000, () => {
  soapListen(app, '/wsdl', soapServices, xml, () => {
    console.log('App running at http://localhost:3000');
  });
});
