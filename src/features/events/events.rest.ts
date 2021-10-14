import { Router } from 'express';
import { addEvent, listEvents } from './events.controller';

const router = Router();

router.get('/events', (req, res) => {
  console.log('REST - List events');
  res.send(listEvents());
});

router.post('/events', (req, res) => {
  console.log('REST - Add event', req.body);
  res.send(addEvent(req.body));
});

export { router as eventsRestRouter };
