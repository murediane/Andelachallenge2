import express, { Router } from 'express';
// import all of your routes from their files
import parcelRoutes from './parcels';
import userRoutes from './authentication';
import Helpers from '../helpers';

const routes = Router();

// API ENTRYPOINT

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ message: 'ACCESS GRANTED' });
});

// UPLOADS ENDPOINT

const uploads = ('/uploads', express.static('uploads'));

//ALL ENDPOINTS

routes.use(entryPoint, userRoutes);
routes.use(Helpers.checkAuth, parcelRoutes);

export default routes;
