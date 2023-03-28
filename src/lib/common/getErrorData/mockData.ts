const firstFunctionName = 'DummyComponent';
const secondFunctionName = 'Index';

const firstFilePath = 'webpack-internal:///./src//DummyComponent/dummyComponent.tsx';
const secondFilePath = 'webpack-internal:///./src/page/index.js';

const firstFileLineChar = '4:23';
const secondFileLineChar = '70:18';

const firstFilePathInfo = `${firstFilePath}:${firstFileLineChar}`;
const secondFilePathInfo = `${secondFilePath}:${secondFileLineChar}`;

const mockChromiumStack = `Error
at ${firstFunctionName} (${firstFilePathInfo})
at ${secondFunctionName} (${secondFilePathInfo})`;

const mockFirefoxStack = `${firstFunctionName}@${firstFilePathInfo}
${secondFunctionName}@${secondFilePathInfo}`;

const mockSafariStack = `${firstFunctionName}@
${secondFunctionName}@`

export const mockStackData = {
  firstFunctionName,
  secondFunctionName,
  firstFilePath,
  firstFileLineChar,
  secondFileLineChar,
  firstFilePathInfo,
  secondFilePathInfo,
  mockChromiumStack,
  mockFirefoxStack,
  mockSafariStack
};

