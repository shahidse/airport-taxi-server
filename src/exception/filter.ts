import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private readonly logger = new Logger(CatchEverythingFilter.name);
  catch(exception: HttpException | unknown, host: ArgumentsHost): void {
    this.logger.log('Error', { exception });
    const { httpAdapter } = this.httpAdapterHost;
    if (!httpAdapter) {
      throw new Error('HttpAdapterHost is not initialized properly');
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const cause =
      exception instanceof HttpException
        ? exception.cause
          ? exception.cause
          : undefined
        : undefined;
    let message = 'Internal Server Error!';
    if (exception instanceof HttpException) {
      // Check if the response is a string or an object
      const responseBody = exception.getResponse();
      message =
        typeof responseBody === 'string'
          ? responseBody
          : responseBody['message'] || responseBody;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      cause,
    };

    // Ensure that the response object is available before sending the response
    if (response) {
      httpAdapter.reply(response, responseBody, httpStatus);
    } else {
      throw new InternalServerErrorException(message);
    }
  }
}
