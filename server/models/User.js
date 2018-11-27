import Joi from 'joi';
import Database from '../database';

// the schema definition of the user

const schema = Joi.object().keys({
  names: Joi.string()
    .required()
    .min(1),
  phone: Joi.string()
    .required()
    .min(10),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string(),
  // .regex(/^[a-zA-Z0-9]{3,30}$/)
  // .required(),
  avatar: Joi.string().uri()
});

// exporting the model of users

export default new Database(schema, 'users');
