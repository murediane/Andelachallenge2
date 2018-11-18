import { Router } from 'express';

import { createParcel, getAll, getParcel } from '../controllers/parcels';

const parcels = Router();
const entry = '/parcels';

// /***************** CREATE THE PARCEL ***************************************/

parcels.post(`${entry}`, createParcel);

// /***************** GET ALL PARCELS ******************************************/

parcels.get(`${entry}`, getAll);

// /***************** GET THE PARCEL BY ID ************************************/

parcels.get(`${entry}/:id`, getParcel);

// /************************ END OF PARCELS APIs ******************************/

export default parcels;
