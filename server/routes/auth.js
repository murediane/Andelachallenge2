import { Router } from 'express';

import { createUser, upload } from '../controllers/auth';

const auth = Router();
const entry = '/auth';

// /***************** CREATE THE USER ACCOUNT **********************************/

auth.post(`${entry}/signup`, createUser);

// /************************ END OF PARCELS APIs ******************************/

export default auth;
