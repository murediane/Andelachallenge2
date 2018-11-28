import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

// CREATE THE USER

const createUser = (req, res) => {
  const { names, phone, email, password: pass } = req.body;

  // encrypt the password before saving
  bcrypt.hash(pass, 10, (err, password) => {
    if (err) return res.status(500).send({ error: err });

    // save the new user in the database */
    User.save({
      names,
      phone,
      email,
      password,
    })
      .then(user => {
        const token = jwt.sign({ ...user.email }, process.env.JWT_KEY, {
          expiresIn: '1h',
        });
        return res.status(201).send({ token, id: user.id });
      })
      .catch(error => res.status(400).send({ error }));
  });
};

export { createUser };
