import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { CommonErrorException } from 'exception/commonError.exception';
import { Request, Response } from 'express';

@Catch(CommonErrorException)
export class CommonErrorResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const responseData = {};
    const route = `${request.method} - ${request.url}`;
    if (error['errorCode']) {
      error['error_code'] = error['errorCode'];
      delete error['errorCode'];
    }
    if (error['detailCode']) {
      error['detail_code'] = error['detailCode'];
      delete error['detailCode'];
    }

    responseData['res_data'] = error;
    responseData['route'] = route;
    response.status(status).json({
      success: 0,
      error: responseData,
    });
  }
}
