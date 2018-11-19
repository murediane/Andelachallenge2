// write down some database configurations here

const users = [
  {
    user_id: 1,
    username: 'gloria',
    password: 'atete',
    confirmpassword: 'atete',
    email: 'murediane@gmail.com',
  },
  {
    user_id: 2,
    username: 'gloria',
    password: 'atete',
    confirmpassword: 'atete',
    email: 'murediane@gmail.com',
  },
];

const parcels = [
  {
    usr_id: 1,
    id: 1,
    category: '50-100kg',
    price: 0,
    pickuploc: 'kigali',
    destination: 'new york',
    presentlocation: 'admin',
    receiver: 'gloria',
    re_email: 'murediana@gmail.com',
    re_phoneno: '+250782798310',
    status: 'pending',
  },
  {
    usr_id: 1,
    id: 2,
    category: '50-100kg',
    price: 0,
    pickuploc: 'kigali',
    destination: 'new york',
    receiver: 'gloria',
    re_email: 'murediana@gmail.com',
    re_phoneno: '+250782798310',
    status: 'In transit',
  },

  {
    usr_id: 2,
    id: 3,
    category: '50-100kg',
    price: '$100',
    pickuploc: 'kigali',
    destination: 'new york',
    receiver: 'gloria',
    re_email: 'murediana@gmail.com',
    re_phoneno: '+250782798310',
    status: 'delivered',
  },
];

export { users, parcels };
