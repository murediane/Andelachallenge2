import express, { Router } from 'express';
import parcelsRoutes from './parcels';
import usersRoutes from './users';
import checkAuth from '../helpers/checkAuth';

const routes = Router();

/** ********* API ENTRYPOINT **************************** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ error: null, message: 'welcome' });
});

/** ********* UPLOADS ENDPOINT ************************** */

const uploads = ('/uploads', express.static('uploads'));

/** ********** ALL ENDPOINTS *************************** */

// Unprotected routes
routes.use(entryPoint);
// Protected routes
routes.use(checkAuth, parcelsRoutes, usersRoutes, uploads);

export default routes;
