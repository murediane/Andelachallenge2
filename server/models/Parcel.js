import Joi from 'joi';
import Collection from '../database';

// the schema definition of the parcel

const schema = Joi.object().keys({
  recipient: Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string()
      .min(10)
      .required(),
  }).required(),
  destination: Joi.string().required(),
  origin: Joi.string()
    .required()
    .min(1),
  weight: Joi.number()
    .required()
    .min(1),
  sender: Joi.string()
    .min(1)
    .required(),
  status: Joi.string()
    .only('transit', 'delivered', 'cancelled')
    .default('unconfirmed'),
});

export default new Collection('Parcel', schema);
