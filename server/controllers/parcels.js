import Parcel from '../models/Parcel';

//  Create a new parcel

const createParcel = (req, res) => {
  Parcel.save({ ...req.body })
    .then(parcel => res.status(201).json({ error: { message: 'created' }, parcel }))
    .catch(err => res.status(400).json({ error: err }));
};

// Get all parcels

const getAll = (req, res) => {
  const { id: sender = null } = req.params;
  Parcel.find(sender !== null ? { sender, ...req.query } : req.query)
    .then(parcels =>
      parcels.length
        ? res.status(200).json({ error: null, parcels })
        : res.status(204).json({ error: { message: 'No parcel created yet' } })
    )
    .catch(err => res.status(400).json({ error: err }));
};

//  Get parcel by Id

const getParcel = (req, res) => {
  const { id } = req.params;
  Parcel.findById(id)
    .then(parcel => res.status(200).json({ error: { message: 'found' }, parcel }))
    .catch(err => res.status(400).json({ error: err }));
};
const userParcels = (req, res) => {
  const { userId: sender } = req.params;
  Parcel.find({ sender })
    .then(parcels => res.status(200).json({ error: null, parcels }))
    .catch(err => res.status(400).json({ error: err }));
};
// user update a specific delivery order

const updateParcel = (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length) {
    Parcel.findById(id)
      .then(record => {
        if (
          record.status.toLowerCase() === 'delivered' ||
          record.status.toLowerCase() === 'cancelled'
        ) {
          res
            .status(400)
            .json({ message: "Can't update the delivered or cancelled order" });
        } else {
          Parcel.update({ ...req.body }, { id })
            .then(parcels => {
              const [parcel] = parcels;
              return res.status(201).json({ message: 'success', parcel });
            })
            .catch(err => res.status(400).json({ message: err.message }));
        }
      })
      .catch(err => res.status(400).json({ message: err.message }));
  } else {
    return res
      .status(400)
      .json({ message: 'Provide the new value(s) for the field(s) to update' });
  }
};

export { createParcel, getAll, getParcel, updateParcel, userParcels };
