import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/User.js';

export async function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).lean();
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
