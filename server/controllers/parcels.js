import { validateParcel } from '../helpers/validators';
import { parcels } from '../database';
/** create your request handlers for the corresponding endpoints */

// the getAll parcels ****/
const getAll = (req, res) => res.send(parcels);

// the get a specific Parcel ****/
const getParcel = (req, res) => {
  const { id } = req.params;
  const parcel = parcels.find(p => p.id === parseInt(id));
  if (!parcel) return res.status(400).send({ message: 'invalid id' });
  return res.send(parcel);
};

// the create a new Parcel ****/
const createParcel = (req, res) => {

  const { error } = validateParcel(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const parcel = { id: parcels.length + 1, ...req.body };
  parcels.push(parcel);
  return res.status(201).send(parcel);
};

// the cancel the specific Parcel ****/
const cancelParcel = (req, res) => {
  const { id } = req.params;
  const parcel = parcels.find(p => p.id === parseInt(id));
  if (!parcel) return res.status(200).send({ message: 'invalid id' });

  parcel.status = 'cancel';
  return res.status(200).send({ ...parcel });
};

// get order by user id endpoint
const userParcels = (req, res) => {
  const { id, userId } = req.params;
  const parcel = parcels.find(p => p.userId === parseInt(userId));
  return parcel
    ? res.send(parcel)
    : res.status(400).send({ message: 'invalid user_id' });

};

// export them all here
export { getAll, getParcel, createParcel, cancelParcel, userParcels };
