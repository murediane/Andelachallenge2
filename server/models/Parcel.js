import Joi from 'joi';
import Database from '../database';

// the schema definition of the parcel

const schema = Joi.object().keys({
  weight: Joi.number().required(),
  price: Joi.number()
    .required()
    .min(1),
  pickupLocation: Joi.string()
    .min(4)
    .required(),
  destination: Joi.string().required(),
  presentLocation: Joi.string()
    .min(4)
    .required(),
  receiverName: Joi.string()
    .min(3)
    .required(),
  sender: Joi.number()
    .min(1)
    .required(),

  receiverEmail: Joi.string()
    .required()
    .min(1),
  receiverPhoneNumber: Joi.number()
    .required()
    .min(1),

  status: Joi.string()
    .only('intransit', 'delivered', 'cancelled')
    .default('pending')
});

export default new Database(schema, 'parcels');
