import express, { Router } from 'express';
import parcelsRoutes from './parcels';

const all = Router();

/** ********* API ENTRYPOINT **************************** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ error: null, message: 'welcome' });
});

/** ********* UPLOADS ENDPOINT ************************** */

const uploads = ('/uploads', express.static('uploads'));

/** ********** ALL ENDPOINTS *************************** */

all.use(entryPoint, parcelsRoutes, uploads);

export default all;
