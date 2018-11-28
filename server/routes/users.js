import { Router } from 'express';
import { getAll as getParcels } from '../controllers/parcels';

const users = Router();
const entry = '/users';

// /*********************** GET USER PARCELS *********************************/

users.get(`${entry}/:id/parcels`, getParcels);

// /************************ END OF USERS APIs ******************************/

export default users;
