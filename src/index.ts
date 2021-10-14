import express from 'express';
import { listen as soapListen, IServices } from 'soap';
import { readFileSync } from 'fs';
import { join } from 'path';
import { eventsSoapService } from './features/events/events.soap';
import { eventsRestRouter } from './features/events/events.rest';

const app = express();

app.use(express.json());
app.use(eventsRestRouter);

const soapServices: IServices = eventsSoapService;
const wsdl = readFileSync(join(__dirname, 'services.wsdl')).toString('utf-8');

app.listen(3000, () => {
  soapListen(app, '/wsdl', soapServices, wsdl, () => {
    console.log('App running at http://localhost:3000');
  });
});
