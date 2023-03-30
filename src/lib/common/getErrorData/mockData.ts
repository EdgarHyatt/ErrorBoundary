const firstFunctionName = 'DummyComponent';
const secondFunctionName = 'Index';

const firstFile = 'dummyComponent.tsx';
const secondFile = 'index.js';

const firstFileLine = '4';
const firstFileChar = '23';
const secondFileLine = '70';
const secondFileChar = '28';

const firstFileLineChar = `${firstFileLine}:${firstFileChar}`;
const secondFileLineChar = `${secondFileLine}:${secondFileChar}`;

const firstFilePath = `webpack-internal:///./src//DummyComponent/${firstFile}`;
const secondFilePath = `webpack-internal:///./src/page/${secondFile}`;

const firstLocalFilePath = `/Users/project/src//DummyComponent/${firstFile}`;
const secondLocalFilePath = `/Users/project/src//DummyComponent/page/${secondFile}`;

const firstFilePathInfo = `${firstFilePath}:${firstFileLineChar}`;
const secondFilePathInfo = `${secondFilePath}:${secondFileLineChar}`;

const mockChromiumStack = `Error
at ${firstFunctionName} (${firstFilePathInfo})
at ${secondFunctionName} (${secondFilePathInfo})`;

const mockFirefoxStack = `${firstFunctionName}@${firstFilePathInfo}
${secondFunctionName}@${secondFilePathInfo}`;

const mockSafariStack = `${firstFunctionName}@
${secondFunctionName}@`

const mockV8Stack = `Error
at Layer.<anonymous> (${firstLocalFilePath}:${firstFileLineChar})
at Something.<anonymous> (${secondLocalFilePath}:${secondFileLineChar})
`;

export const mockStackData = {
  firstFile,
  firstFileChar,
  firstFileLine,
  firstFunctionName,
  firstFilePath,
  firstFileLineChar,
  firstLocalFilePath,
  firstFilePathInfo,
  mockChromiumStack,
  mockFirefoxStack,
  mockSafariStack,
  mockV8Stack
};

