import express, { Router } from 'express';
// import all of your routes from their files
import parcelRoutes from './parcels';

const routes = Router();

// API ENTRYPOINT 

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ message: 'ACCESS GRANTED' });
});

// UPLOADS ENDPOINT

const uploads = ('/uploads', express.static('uploads'));

//ALL ENDPOINTS 

routes.use(entryPoint, parcelRoutes, uploads);

export default routes;
