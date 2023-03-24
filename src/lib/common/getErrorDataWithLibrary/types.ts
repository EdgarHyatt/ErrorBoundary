
export type GetErrorDataWithLibrary = (e: Error, message: string) => {
  message: string,
  errorType: string,
  line: number,
  char: number,
  method: string,
  file: string
};
