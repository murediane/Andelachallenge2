import { Router } from 'express';
import { createUser } from '../authentication/user';

const auth = Router();
const entrypoint = '/auth';
// Create user
auth.post(`${entrypoint}/signup`, createUser);

export default auth;
