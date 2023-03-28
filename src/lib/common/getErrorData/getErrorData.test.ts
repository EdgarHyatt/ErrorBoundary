import { getErrorData } from './index';
import { getStackErrorInfo, isChromiumBrowser } from './functions';
import { mockStackData } from './mockData';

describe('function getErrorData', () => {
  const mockMessage = 'Mock error message';
  const genericErrorResponse = {
    message: mockMessage,
    errorType: 'Error',
  };

  const mockErrorImplementation = (stack: string, message: string, name?: string) => {
    const mockFn = jest.fn();
    const mockError = new mockFn();

    mockError.stack = stack;
    mockError.message = message;
    mockError.name = name ?? 'Error';

    return mockError
  }

  it('should return parsed data on Firefox stack', () => {
    const expectedResult = {
      ...genericErrorResponse,
      completePath: mockStackData.firstFilePath,
      shortPath: 'src//DummyComponent/dummyComponent.tsx',
      file: 'dummyComponent.tsx',
      line: '4',
      char: '23'
    };

    const mockError = mockErrorImplementation(mockStackData.mockFirefoxStack, mockMessage);

    const errorData = getErrorData(mockError);
    expect(errorData).toEqual(expectedResult);
  });

  it('should return parsed data on Chromium stack', () => {
    const expectedResult = {
      ...genericErrorResponse,
      completePath: mockStackData.firstFilePath,
      shortPath: 'src//DummyComponent/dummyComponent.tsx',
      file: 'dummyComponent.tsx',
      line: '4',
      char: '23'
    };

    const mockError = mockErrorImplementation(mockStackData.mockChromiumStack, mockMessage);

    const errorData = getErrorData(mockError);
    expect(errorData).toEqual(expectedResult);
  });

  it('should return parsed data on Safari stack', () => {
    const expectedResult = {
      ...genericErrorResponse,
      completePath: null,
      shortPath: null,
      file: 'DummyComponent',
      line: null,
      char: null
    };

    const mockError = mockErrorImplementation(mockStackData.mockSafariStack, mockMessage);

    const errorData = getErrorData(mockError);
    expect(errorData).toEqual(expectedResult);
  });
});

describe('function isChromiumBrowser', () => {
  it("should know when it's a chromium based stack", () => {
    const result = isChromiumBrowser('Error: Error message')
    expect(result).not.toBeNull();
  });

  it("should know when it's a chromium based stack", () => {
    const result = isChromiumBrowser(`${mockStackData.firstFunctionName}@${mockStackData.firstFilePathInfo}`)
    expect(result).toBeNull();
  });
});

describe('function getStackErrorInfo', () => {
  const formats = ['tsx:', 'ts:', 'jsx:', 'js:'];

  it('should parse the complete data on chromium and firefox based stacks', () => {
    const expectedResult = {
      completePath: mockStackData.firstFilePath,
      shortPath: 'src//DummyComponent/dummyComponent.tsx',
      file: 'dummyComponent.tsx',
      line: '4',
      char: '23'
    };

    const firefoxInput = `${mockStackData.firstFunctionName}@${mockStackData.firstFilePathInfo}`;
    const chromiumInput = `at ${mockStackData.firstFunctionName} (${mockStackData.firstFilePathInfo})`;

    const resultFirefox = getStackErrorInfo(formats, firefoxInput, false);
    const resultChromium = getStackErrorInfo(formats, chromiumInput, true);

    expect(resultChromium).toEqual(expectedResult);
    expect(resultFirefox).toEqual(expectedResult);
  });
});

