export type GetStackErrorInfo = (formats: string[], text: string) => {
  line: string | null,
  char: string | null,
  completePath: string | null,
  shortPath: string | null,
  file: string
};

export type CleanStackErrorLine = (text: string) => string;

export type IsChromiumBrowser = (text: string) => RegExpMatchArray | null;

export type GetErrorData = (e: Error, message?: string) => {
  message: string,
  errorType: string,
  completePath: string | null,
  shortPath: string | null,
  file: string,
  line: string | null,
  char: string | null
} | Error;
