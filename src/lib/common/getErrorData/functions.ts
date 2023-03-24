import { CleanStackErrorLine, GetStackErrorInfo, IsChromiumBrowser } from './types';

export const cleanStackErrorLine: CleanStackErrorLine = (text) => {
  const textSplitter = 'at ';
  const index = text.indexOf(textSplitter);

  if (index === -1) {
    return text;
  }

  return text.slice(index + textSplitter.length - 1, text.length);
}

export const getStackErrorInfo: GetStackErrorInfo = (formats, text) => {
  const webpackTextToRemove = 'webpack-internal:///./';
  const indexOfWebpackText = text.indexOf(webpackTextToRemove);

  if (indexOfWebpackText !== -1) {
    const { format: fileFormat, index: formatIndex } = formats.reduce((acc, format) => {
      const index = text.indexOf(format);
      if (index === -1) {
        return acc;
      }
      return {format, index};
    }, {format: '', index: 0});
  
    const lineAndChar = text.slice(formatIndex + fileFormat.length, text.length - 1).split(':');
    const line = lineAndChar[0];
    const char = lineAndChar[1];
     
    const completePath = text.slice(indexOfWebpackText, formatIndex + fileFormat.length - 1);
    const shortPath = completePath.slice(webpackTextToRemove.length);

    const textArray = text.split('/');
    const componentText = textArray[textArray.length - 1];
    const file = componentText.slice(0, componentText.indexOf(":"));

    return { line, char, completePath, shortPath, file }
  }

  const file = text.slice(0, text.length - 1);

  return { line: null, char: null, completePath: null, shortPath: null, file }
}

export const isChromiumBrowser: IsChromiumBrowser = (text: string): RegExpMatchArray | null => {
  const textSplit = text.split(':');
  const errorTypesRegex = /^Error|Error$/;

  return textSplit[0].match(errorTypesRegex);
}
