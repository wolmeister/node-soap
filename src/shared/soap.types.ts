export type SoapRequest<T> = { body: T };

export type SoapResponse<T> = { result: T };

export type SoapListResponse<T extends unknown[], N extends string> = {
  result: { [key in N]: T[0] }[];
};
