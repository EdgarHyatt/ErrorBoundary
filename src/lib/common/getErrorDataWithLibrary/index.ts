import { getLocationFromError } from "get-current-line";

import { GetErrorDataWithLibrary } from './types';

export const getErrorDataWithLibrary: GetErrorDataWithLibrary = (e, message) => {
  const errorLocation = getLocationFromError(e);
  const errorData = {
    ...errorLocation,
    message: message ?? e.message,
    errorType: e.name,
  }

  return errorData;
};
