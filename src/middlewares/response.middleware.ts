import { Request, Response, NextFunction, response } from "express";

export class BaseResponse {
  private responseCode: string;
  private message: string;
  private data: any;

  constructor(responseCode: string, message: string, data: any = null) {
    this.responseCode = responseCode;
    this.message = message;
    this.data = data;
  }

  // Static method for success response
  static responseSuccess(
    data: any,
    message: string = "Success",
    responseCode: string
  ): BaseResponse {
    return new BaseResponse(responseCode, message, data);
  }

  // Static method for error response
  static responseError(
    message: string = "Error",
    data: any = null,
    responseCode: string
  ): BaseResponse {
    return new BaseResponse(responseCode, message, data);
  }

  // Method to return the response as a structured object
  toJSON() {
    return {
      statusResponse: this.responseCode,
      message: this.message,
      data: this.data,
    };
  }
}

// Menambahkan typing untuk metode baru di Response
declare module "express-serve-static-core" {
  interface Response {
    success: (data: any, responseCode: string, message?: string) => Response;
    error: (
      responseCode: string,
      message?: string,
      data?: any,
      statusCode?: number
    ) => Response;
  }
}

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Middleware untuk response success
  res.success = (
    data: any,
    responseCode: string,
    message: string = "Success"
  ) => {
    const response = BaseResponse.responseSuccess(data, message, responseCode);
    return res.status(200).json(response.toJSON()); // Kirim respons sukses dengan status 200
  };

  // Middleware untuk response error
  res.error = (
    responseCode: string,
    message: string = "Error",
    data: any = null,
    statusCode: number = 400
  ) => {
    const response = BaseResponse.responseError(responseCode, message, data);
    return res.status(statusCode).json(response.toJSON()); // Kirim respons error dengan status sesuai statusCode
  };

  next(); // Lanjutkan ke middleware atau route berikutnya
};
