import { GetStackErrorInfo, IsChromiumBrowser } from './types';

export const getStackErrorInfo: GetStackErrorInfo = (formats, text, isChromiumBrowser) => {
  const webpackTextToRemove = 'webpack-internal:///./';
  const indexOfWebpackText = text.indexOf(webpackTextToRemove);
  const isSafari = !isChromiumBrowser && indexOfWebpackText === -1;

  if (isSafari) {
    const file = text.slice(0, text.length - 1);
    return { line: null, char: null, completePath: null, shortPath: null, file };
  }

  const { format: fileFormat, index: formatIndex } = formats.reduce(
    (acc, format) => {
      const index = text.indexOf(format);
      if (index === -1) {
        return acc;
      }
      return { format, index };
    },
    { format: '', index: 0 }
  );

  const offsetForLineAndChar = isChromiumBrowser ? 0 : 1;

  const lineAndChar = text
    .slice(formatIndex + fileFormat.length, text.length - 1 + offsetForLineAndChar)
    .split(':');
  const line = lineAndChar[0];
  const char = lineAndChar[1];

  let completePath;
  let shortPath;

  if (indexOfWebpackText !== -1) {
    completePath = text.slice(indexOfWebpackText, formatIndex + fileFormat.length - 1);
    shortPath = completePath.slice(webpackTextToRemove.length);
  } else {
    const regex = /\(\/.*\)/g
    const regexResult = text.match(regex);
    const pathWithParentheses = regexResult ? regexResult[0] : '';
    completePath = pathWithParentheses.slice(1, pathWithParentheses.indexOf(fileFormat) + fileFormat.length - 1);
    shortPath = completePath;
  }

  const textArray = text.split('/');
  const componentText = textArray[textArray.length - 1];
  const file = componentText.slice(0, componentText.indexOf(':'));

  return { line, char, completePath, shortPath, file };
}

export const isChromiumBrowser: IsChromiumBrowser = (text) => {
  const textSplit = text.split(':');
  const errorTypesRegex = /^Error|Error$/;

  return textSplit[0].match(errorTypesRegex);
}
