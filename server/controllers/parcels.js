import Parcel from '../models/Parcel';

//  Create a new parcel

const createParcel = (req, res) => {
  Parcel.save({ ...req.body })
    .then(parcel => res.status(201).json({ error: null, parcel }))
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
    .then(parcel => res.status(200).json({ error: null, parcel }))
    .catch(err => res.status(400).json({ error: err }));
};
const userParcels = (req, res) => {
  const { userId: sender } = req.params;
  Parcel.find({ sender })
    .then(parcels => res.status(200).json({ error: null, parcels }))
    .catch(err => res.status(400).json({ error: err }));
};
// user cancel a specific delivery order

const cancelParcel = (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length) {
    Parcel.findById(id)
      .then(record => {
        if (
          record.status.toLowerCase() === 'delivered' ||
          record.status.toLowerCase() === 'cancelled'
        ) {
          res.status(400).json({
            error: {
              message: 'your order has been delivered or cancelled earlier',
              name: 'ValidationError'
            }
          });
        } else {
          Parcel.update({ ...req.body }, { id })
            .then(parcels => {
              const [parcel] = parcels;
              res.status(201).json({ error: null, parcel });
            })
            .catch(err => res.status(400).json({ error: err }));
        }
      })
      .catch(err => res.status(400).json({ error: err }));
  } else {
    res.status(400).json({
      error: { message: "can't empty the record", name: 'ValidationError' }
    });
  }
};

export { createParcel, getAll, getParcel, cancelParcel, userParcels };
