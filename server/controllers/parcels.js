import Parcel from '../models/Parcel';

// /***************** CREATE THE PARCEL ***************************************/

const createParcel = (req, res) => {
  Parcel.save({ ...req.body })
    .then(parcels => res.status(201).json({ error: null, parcels }))
    .catch(err => res.status(400).json({ error: err }));
};

// /**GET ALL PARCELS [filter them with search queries/getAll if no queries]****/

const getAll = (req, res) => {
  const { id: sender = null } = req.params;
  Parcel.find(sender ? { sender, ...req.query } : { ...req.query })
    .then((parcels) => {
      parcels.length
        ? res.status(200).json({ error: null, parcels })
        : res.status(204).json({ error: { message: 'no content' } });
    })
    .catch(err => res.status(400).json({ error: err }));
};

// /***************** GET THE PARCEL BY ID ************************************/

const getParcel = (req, res) => {
  const { id } = req.params;
  Parcel.findById(id)
    .then(parcel => res.status(200).json({ error: null, parcel }))
    .catch(err => res.status(400).json({ error: err }));
};

// /*********** CANCEL THE PARCEL DELIVERY ORDER ******************************/

const cancelOrder = (req, res) => {
  const { id } = req.params;
  // look up in the collection to find the matching objectith the give ID
  Parcel.findById(id)
    .then((parcel) => {
      /**
       * check for its status if it's delivered, return an error. otherwise cancel it.
       */
      const { status } = parcel;
      if (status.toLowerCase() === 'delivered') {
        return res.status(403).json({
          error: {
            name: 'permissionError',
            message: "can't cancel delivered order",
          },
        });
      }
      // set the parcel status to cancelled
      Parcel.findByIdAndUpdate(id, { status: 'cancelled' })
        .then(parcels => res.status(200).json({ error: null, parcels }))
        .catch(err => res.status(400).json({ error: err }));
    })
    .catch(err => res.status(400).json({ error: err }));
};

// /************************ END OF PARCELS APIs ******************************/

export { createParcel, getAll, getParcel,cancelOrder };
