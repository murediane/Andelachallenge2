import { Router } from 'express';

import { createParcel } from '../controllers/parcels';

const parcels = Router();
const entry = '/parcels';

// /***************** CREATE THE PARCEL ***************************************/

parcels.post(`${entry}`, createParcel);

// /************************ END OF PARCELS APIs ******************************/

export default parcels;
