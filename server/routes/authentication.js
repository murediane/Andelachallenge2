import { Router } from 'express';
import { createUser, login } from '../authentication/user';

const auth = Router();
const entrypoint = '/auth';
// Create user
auth.post(`${entrypoint}/signup`, createUser);

auth.post(`${entrypoint}/login`, login);

export default auth;
