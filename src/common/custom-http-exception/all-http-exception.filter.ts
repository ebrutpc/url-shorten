import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseErrorResponse } from '../../base.error.response';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };
    const baseResponse = new BaseErrorResponse({
      statusCode: status,
      timestamp: new Date().getTime() / 1000,
      path: request.url,
      message: exceptionResponse.message,
    });
    response.status(status).json(baseResponse);
  }
}
