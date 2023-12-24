import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { QueryErrorException } from 'exception/queryError.exception';
import { Request, Response } from 'express';

@Catch(QueryErrorException)
export class QueryErrorResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const responseData = {};
    const route = `${request.method} - ${request.url}`;

    responseData['res_data'] = {
      error_code: 'DB_QUERY_ERR',
    };
    responseData['route'] = route;
    response.status(status).json({
      success: 0,
      error: responseData,
    });
  }
}
