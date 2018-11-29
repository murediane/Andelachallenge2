import { Router } from 'express';

import {
  createParcel,
  updateParcel,
  userParcels,
  getAll,
  getParcel
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

router.put(`${entry}/:id/cancel`, updateParcel);
//CHANGE DESTINATION
router.put(`${entry}/:id/destination`, updateParcel);
// CHANGE  Status
//router.put(`${entry}/:id/status`, updateParcel);
//Change presentLocation
//router.put(`${entry}/:id/presentLocation`, updateParcel);

//  GET ALL USER PARCELS

router.get(`/users/:userId${entry}`, userParcels);

// Export  router

export default router;
