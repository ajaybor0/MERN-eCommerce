import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
  // Generating a JWT token for the authenticated user
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
    { algorithm: 'RS256' }
  );

  // Setting the JWT as an HTTP-only cookie for enhanced security
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
  });
};
