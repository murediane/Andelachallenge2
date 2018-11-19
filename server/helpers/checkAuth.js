import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const [token, appName] = authorization.split(' ');
    req.user = jwt.verify(token, process.env.JWT_KEY);
    console.log('Token is:');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'access denied' });
  }
};
