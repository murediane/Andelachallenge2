import Joi from 'joi';
import { parcels } from '../database';
/** create your request handlers for the corresponding endpoints */

// the getAll parcels ****/
const getAll = (req, res) => res.send(parcels);

// the get a specific Parcel ****/
const getParcel = (req, res) => {
  const { id } = req.params;
  const parcel = parcels.find(p => p.id === parseInt(id));
  if (!parcel) res.status(404).send('the parcels with a given id doesnot exist');
  res.send(parcel);
};

// the create a new Parcel ****/
const createParcel = (req, res) => {
  const schema = {
    user_id: Joi.number()
      .min(1)
      .required(),
    category: Joi.string()
      .min(4)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    pickuploc: Joi.string()
      .min(4)
      .required(),
    destination: Joi.string()
      .min(4)
      .required(),
    presentlocation: Joi.string()
      .min(4)
      .required(),
    receiver: Joi.string()
      .min(3)
      .required(),
    re_email: Joi.string()
      .min(4)
      .required(),
    re_phoneno: Joi.string()
      .min(4)
      .required(),
    status: Joi.string()
      .min(4)
      .required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const parcel = { id: parcels.length + 1, ...req.body };
  parcels.push(parcel);
  return res.send(parcel);
};

// the cancel the specific Parcel ****/
const cancelParcel = (req, res) => {
  const { id } = req.params;
  const parcel = parcels.find(p => p.id === parseInt(id));
  if (!parcel) res.status(404).send('the parcels with a given id does not exist');
  const schema = {
    user_id: Joi.number()
      .min(1)
      .required(),
    category: Joi.string()
      .min(4)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    pickuploc: Joi.string()
      .min(4)
      .required(),
    destination: Joi.string()
      .min(4)
      .required(),
    presentlocation: Joi.string()
      .min(4)
      .required(),
    receiver: Joi.string()
      .min(3)
      .required(),
    re_email: Joi.string()
      .min(4)
      .required(),
    re_phoneno: Joi.string()
      .min(4)
      .required(),
    status: Joi.string()
      .min(4)
      .required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send(result.error.details[0].message);
  parcel.status = 'cancel';
  return res.send(parcel);
};

// get order by user id endpoint
const userParcels = (req, res) => {
  const { id, userid } = req.params;
  const parcel = parcels.find(
    p => p.user_id === parseInt(userid) && p.id === parseInt(id),
  );
  return parcel
    ? res.send(parcel)
    : res.status(404).send('the parcels with a given id does not exist');
};

// export them all here
export {
  getAll, getParcel, createParcel, cancelParcel, userParcels,
};
