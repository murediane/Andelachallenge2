import { Router } from 'express';

import {
  createParcel,
  cancelParcel,
  userParcels,
  getAll,
  getParcel,
} from '../controllers/parcels';

const router = Router();
const entry = '/parcels';

//  GET ALL PARCELS 

router.get(`${entry}`, getAll);

//  GET THE PARCEL BY ID 

router.get(`${entry}/:id`, getParcel);

//  CREATE THE PARCEL 

router.post(`${entry}`, createParcel);

//  CANCEL THE PARCEL 

router.put(`${entry}/:id`, cancelParcel);

//  GET ALL USER PARCELS 

router.get('/users/:userid/parcels/:id', userParcels);

// Export  router

export default router;