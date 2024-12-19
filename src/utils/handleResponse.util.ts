import { Response } from "express";
import { getReasonPhrase } from "http-status-codes";
import {
  IApiErrorResponse,
  IApiResponse,
  IPagination,
} from "../types/response.interface";

export class ResponseHandler {
  static createAndSendResponse<T>(
    res: Response,
    status: number,
    message: string,
    data: T,
    pagination?: IPagination
  ): void {
    const response: IApiResponse<T> = { status, message, data, pagination };
    res.status(status).json(response);
  }

  static createAndSendErrorResponse<T>(
    res: Response,
    status: number,
    message: string,
    code: string
  ): void {
    const response: IApiErrorResponse<T> = { status, error: { code, message } };
    res.status(status).json(response);
  }

  static sendSuccessResponse<T>(
    res: Response,
    data: T,
    message: string,
    status: number = 200,
    paginated: boolean = false
  ): void {
    if (paginated) {
      const { docs, ...pagination } = data as any as {
        docs: any[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage: number | null;
        nextPage: number | null;
      };
      this.createAndSendResponse(res, status, message, docs, pagination);
    } else {
      this.createAndSendResponse(res, status, message, data, undefined);
    }
  }

  static sendErrorResponse(
    res: Response,
    message: string,
    status: number = 500
  ): void {
    this.createAndSendErrorResponse(
      res,
      status,
      message,
      getReasonPhrase(status)
    );
  }
}
