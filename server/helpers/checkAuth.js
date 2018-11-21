import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const [token] = authorization.split(' ');
    req.user = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'access denied' });
  }
};
