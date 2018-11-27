import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const [bearer, token] = authorization.split(' ');
    bearer === 'Bearer'
      ? await (req.user = jwt.verify(token, process.env.JWT_KEY))
      : null;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'access denied' });
  }
};
