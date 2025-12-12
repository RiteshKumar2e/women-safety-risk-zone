export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  NGO: 'NGO',
  POLICE: 'POLICE'
};

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
