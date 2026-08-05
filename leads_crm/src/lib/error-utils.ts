/**
 * Utility to sanitize technical errors (Firebase, Firestore, Auth, Network)
 * into clean, user-friendly messages for toasts and UI alerts.
 */
export function sanitizeErrorMessage(
  error: any,
  fallbackMessage: string = 'Something went wrong. Please try again.'
): string {
  if (!error) return fallbackMessage;

  // Log full technical error internally for developer debugging
  console.error('[Internal CRM Log]:', error);

  const rawMessage = typeof error === 'string' ? error : error?.message || error?.code || '';

  if (!rawMessage) return fallbackMessage;

  // Firebase Auth Error Mappings
  if (
    rawMessage.includes('auth/invalid-credential') ||
    rawMessage.includes('auth/wrong-password') ||
    rawMessage.includes('auth/user-not-found') ||
    rawMessage.includes('Invalid credentials')
  ) {
    return 'Invalid username/email or password. Please try again.';
  }
  if (
    rawMessage.includes('auth/user-disabled') ||
    rawMessage.includes('Account disabled')
  ) {
    return 'Your account has been deactivated. Please contact an administrator.';
  }
  if (rawMessage.includes('auth/too-many-requests')) {
    return 'Too many failed login attempts. Please wait a few moments and try again.';
  }
  if (
    rawMessage.includes('auth/network-request-failed') ||
    rawMessage.includes('network-error') ||
    rawMessage.includes('Failed to fetch')
  ) {
    return 'Unable to connect. Please check your internet connection and try again.';
  }
  if (
    rawMessage.includes('permission-denied') ||
    rawMessage.includes('Missing or insufficient permissions') ||
    rawMessage.includes('PERMISSION_DENIED')
  ) {
    return 'You do not have permission to perform this request.';
  }
  if (
    rawMessage.includes('session') ||
    rawMessage.includes('unauthorized') ||
    rawMessage.includes('Unauthorized')
  ) {
    return 'Your session has expired. Please sign in again.';
  }

  // Filter out any messages that contain raw code, stack traces, or internal server errors
  if (
    rawMessage.includes('Firebase') ||
    rawMessage.includes('Firestore') ||
    rawMessage.includes('auth/') ||
    rawMessage.includes('500') ||
    rawMessage.includes('Internal Server Error') ||
    rawMessage.includes('TypeError') ||
    rawMessage.includes('ERR_') ||
    rawMessage.includes('Exception') ||
    rawMessage.includes('at ') ||
    rawMessage.length > 120
  ) {
    return fallbackMessage;
  }

  // Return clean message if safe
  return rawMessage;
}
