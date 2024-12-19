export interface IPagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface IApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
  pagination?: IPagination | null;
}

export interface IError {
  code: string;
  message: string;
}

export interface IApiErrorResponse<T> {
  status: number;
  error: IError | null;
}
