// Cookie utility functions for secure token management

const COOKIE_OPTIONS = {
  httpOnly: true, // Prevent XSS attacks
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Allow cross-site cookies in production
  maxAge: 30 * 60 * 1000, // 30 minutes for access token
  path: '/'
};

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Allow cross-site cookies in production
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days for refresh token
  path: '/'
};

// Set access token cookie
const setAccessTokenCookie = (res, token) => {
  res.cookie('accessToken', token, COOKIE_OPTIONS);
};

// Set refresh token cookie
const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, REFRESH_COOKIE_OPTIONS);
};

// Clear both token cookies
const clearTokenCookies = (res) => {
  res.clearCookie('accessToken', COOKIE_OPTIONS);
  res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS);
};

// Get token from cookie or Authorization header
const getTokenFromRequest = (req) => {
  // First try to get from cookie (more secure)
  const cookieToken = req.cookies?.accessToken;
  if (cookieToken) {
    return cookieToken;
  }
  
  // Fallback to Authorization header for backward compatibility
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  
  return null;
};

module.exports = {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  clearTokenCookies,
  getTokenFromRequest,
  COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS
};
