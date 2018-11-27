import jwt from 'jsonwebtoken';

export default class Helpers {
  static createToken(args = {}, options = {}) {
    return jwt.sign(args, process.env.JWT_KEY, options);
  }
}
