export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'Registration successful',
    LOGOUT_SUCCESS: 'Logged out successfully',
    UNAUTHORIZED: 'Please login to continue',
    SESSION_EXPIRED: 'Your session has expired',
  },
  ERRORS: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    INVALID_CREDENTIALS: 'Invalid email or password',
  },
} as const;