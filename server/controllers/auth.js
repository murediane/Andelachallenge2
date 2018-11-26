import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

// /***************** UPLOADING USER ASSETS ***********************************/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/avatars/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
    ? cb(null, true) // (error?:Error(), save?:boolean)
    : cb(null, false); // (error?:Error(), save?:boolean)
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

// /***************** CREATE THE USER ***************************************/

const createUser = (req, res) => {
  const { file = {} } = req;
  const { path: avatar } = file;
  const {
    names, phone, email, password: pass
  } = req.body;

  /** encrypt the password before saving */
  bcrypt.hash(pass, 10, (err, password) => {
    if (err) return res.status(500).json({ error: err });

    /** save the new user in the database */
    User.save({
      names,
      phone,
      email,
      password,
      avatar
    })
      .then(user => {
        const token = jwt.sign({ ...user.email }, process.env.JWT_KEY, {
          expiresIn: '1h'
        });
        return res.status(201).json({ token, id: user.id });
      })
      .catch(error => res.status(400).json({ error }));
  });
};

// /************************ EXPORT ALL USERS AUTH HANDLERS ******************/

export { createUser, upload };
