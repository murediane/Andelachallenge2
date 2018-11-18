import Parcel from '../models/Parcel';

// /***************** CREATE THE PARCEL ***************************************/

const createParcel = (req, res) => {
  Parcel.save({ ...req.body })
    .then(parcels => res.status(201).json({ error: null, parcels }))
    .catch(err => res.status(400).json({ error: err }));
};

// /************************ END OF PARCELS APIs ******************************/

export { createParcel };
