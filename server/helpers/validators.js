import Joi from 'joi';

const validateParcel = parcel => {
  const schema = {
    userId: Joi.number()
      .min(1)
      .required(),
    weight: Joi.number()
      .min(4)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    pickupLocation: Joi.string()
      .min(4)
      .required(),
    destination: Joi.string()
      .min(4)
      .required(),
    presentLocation: Joi.string()
      .min(4)
      .required(),
    receiver: Joi.string()
      .min(3)
      .required(),
    receiverEmail: Joi.string()
      .min(4)
      .required(),
    recieverPhoneNumber: Joi.string()
      .min(4)
      .required(),
    status: Joi.string()
      .min(4)
      .required(),
  };
  return Joi.validate(parcel, schema);
};
const validateUser = user => {
  const schema = {
    names: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string()
      .min(10)
      .required(),
    email: Joi.email()
      .min(10)
      .required(),
    pasword: Joi.string().min(8).required,
  };
  return Joi.validate(user, schema);
};
export { validateParcel, validateUser };
