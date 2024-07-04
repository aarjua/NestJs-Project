import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message;
    const httpstatus =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).httpstatus;
    const data =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).data
          ? (exceptionResponse as any).data
          : {};
    console.log('exceptionResponse rre', exceptionResponse);
    response.status(httpstatus).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      data:data
    });
  }
}
