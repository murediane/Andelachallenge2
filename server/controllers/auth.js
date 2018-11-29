import multer from 'multer';
import bcrypt from 'bcrypt';

import User from '../models/User';
import Helpers from '../helpers';

//CREATE THE USER

const createUser = (req, res) => {
  const { names, phone, email, password: pass } = req.body;

  //encrypt the password before saving *
  bcrypt.hash(pass, 10, (err, password) => {
    if (err) return res.status(500).json({ error: err });

    /** save the new user in the database */
    User.save({
      names,
      phone,
      email,
      password
    })
      .then(user =>
        res.status(201).json({
          error: null,
          token: Helpers.createToken(
            { email: user.email, id: user.id },
            { expiresIn: '1h' }
          ),
          id: user.id
        })
      )
      .catch(error => res.status(400).json({ error }));
  });
};

//user sign in

const login = (req, res) => {
  const { email, password: pass } = req.body;
  User.find({ email })
    .then(users => {
      bcrypt.compare(pass, users[0].password, (err, same) => {
        if (same === true) {
          return res.status(200).json({
            error: null,
            token: Helpers.createToken(
              { email: users[0].email, id: users[0].id },
              { expiresIn: '1h' }
            ),
            id: users[0].id
          });
        }
        return res.status(401).json({
          error: {
            name: 'ValidationError',
            message: 'Invalid email or password !'
          }
        });
      });
    })
    .catch(err => res.status(401).json({ error: err }));
};

export { createUser, upload, login };
