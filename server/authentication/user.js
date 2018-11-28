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
      password
    })
      .then(user => {
        const token = jwt.sign({ ...user.email }, process.env.JWT_KEY, {
          expiresIn: '1h'
        });
        return res.status(201).send({ token, id: user.id });
      })
      .catch(error => res.status(400).send({ error }));
  });
};

// /***************** THE USER ACCOUNT LOGIN ********************************/

const login = (req, res) => {
  const { email, password: pass } = req.body;
  User.find({ email })
    .then(users => {
      bcrypt.compare(pass, users[0].password, (err, same) => {
        if (same === true) {
          return res.status(200).json({
            error: null,
            token: jwt.sign({ ...users[0].email }, process.env.JWT_KEY, {
              expiresIn: '1h'
            }),
            id: users[0].id
          });
        }
        return res.status(401).json({
          error: {
            name: 'ValidationError',
            message: 'email or password mismatch!'
          }
        });
      });
    })
    .catch(err => res.status(401).json({ error: err }));
};

// /************************ EXPORT ALL USERS AUTH HANDLERS ******************/

export { createUser, login };
