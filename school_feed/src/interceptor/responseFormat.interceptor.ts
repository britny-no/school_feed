import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Response<T> {
  success: number;
  data: T;
  msg: string;
}

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      catchError((err) => {
        // return throwError(err);
        throw err;
      }),
      map((data) => {
        return {
          success: 1,
          data: data.data,
          msg: data.msg,
        };
      }),
    );
  }
}
