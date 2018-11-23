// write down some database configurations here

const users = [
  {
    userId: 1,
    userName: 'gloria',
    password: 'atete',
    confirmpassword: 'atete',
    email: 'murediane@gmail.com',
  },
  {
    userId: 2,
    userName: 'gloria',
    password: 'atete',
    confirmPassword: 'atete',
    email: 'murediane@gmail.com',
  },
];

const parcels = [
  {
    userId: 1,
    id: 1,
    category: '50-100kg',
    price: 0,
    pickupLocation: 'kigali',
    destination: 'new york',
    presentLocation: 'admin',
    receiver: 'gloria',
    recieverEmail: 'murediana@gmail.com',
    recieverPhoneNumber: '+250782798310',
    status: 'cancel',
  },
  {
    userId: 1,
    id: 2,
    category: '50-100kg',
    price: 0,
    pickupLocation: 'kigali',
    destination: 'new york',
    receiver: 'gloria',
    recieverEmail: 'murediana@gmail.com',
    recieverPhoneNumber: '+250782798310',
    status: 'In transit',
  },

  {
    userId: 2,
    id: 3,
    category: '50-100kg',
    price: '$100',
    pickupLocation: 'kigali',
    destination: 'new york',
    receiver: 'gloria',
    recieverEmail: 'murediana@gmail.com',
    recieverPhoneNumber: '+250782798310',
    status: 'delivered',
  },
];

export { users, parcels };
