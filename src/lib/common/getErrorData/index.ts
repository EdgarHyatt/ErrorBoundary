import { getStackErrorInfo, isChromiumBrowser } from './functions';
import { GetErrorData } from './types';

const formats = ['tsx:', 'ts:', 'jsx:', 'js:'];

export const getErrorData: GetErrorData = (e, message = '') => {
  if (!e.stack) {
    return e;
  }

  const split = e.stack.split("\n");

  let callerArrayIndex = 0;
  if (isChromiumBrowser(split[0])) {
    callerArrayIndex++;
  }

  const callerParagraph = split[callerArrayIndex];
  
  const { line, char, completePath, shortPath, file } = getStackErrorInfo(formats, callerParagraph, Boolean(callerArrayIndex));

  const errorObject = {
    message: message || e.message,
    errorType: e.name,
    completePath,
    shortPath,
    file,
    line,
    char,
  };

  return errorObject;
}

