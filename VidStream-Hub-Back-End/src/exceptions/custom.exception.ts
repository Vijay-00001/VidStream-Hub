import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Custom Exception
 * @class CustomException
 * @implements {ExceptionFilter} to catch HttpException
 */
@Catch(HttpException)
export class CustomException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();
    const req = context.getRequest<Request>();

    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      path: `${req.protocol}://${req.get('host')}${req.url} `,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
