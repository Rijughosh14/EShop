import { createSelector } from '@reduxjs/toolkit';

// Base selector for auth state
const selectAuthState = (state) => state.auth;

// Individual selectors
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectRefreshToken = createSelector(
  [selectAuthState],
  (auth) => auth.refreshToken
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

// Combined selectors
export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsLoading, selectAuthError],
  (isAuthenticated, isLoading, error) => ({
    isAuthenticated,
    isLoading,
    error
  })
);

export const selectUserProfile = createSelector(
  [selectUser, selectIsAuthenticated],
  (user, isAuthenticated) => ({
    user,
    isAuthenticated,
    hasProfile: !!user
  })
);

// Selector for checking if user has specific permissions (extensible)
export const selectUserPermissions = createSelector(
  [selectUser],
  (user) => ({
    canCheckout: !!user,
    canViewProfile: !!user,
    // Add more permissions as needed
  })
);
