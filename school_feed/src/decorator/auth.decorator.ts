import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    // 약속된 키값으로 올리면 인증
    // 실 개발시 복호화 가능한 방식으로 암호화한 jwt 유효성 검증
    if (authorization && authorization === process.env.AUTH_ADMIN) {
      return true;
    } else {
      throw new CommonErrorException(
        {
          errorCode: ErrorCodeEnum.UNAUTHORIZED_REQUEST,
          detailCode: DetailCodeEnum.TOKEN_MISMATCH,
        },
        401,
      );
    }
  }
}

export class StudentAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    // 약속된 키값으로 올리면 인증
    // 실 개발시 복호화 가능한 방식으로 암호화한 jwt 유효성 검증
    if (authorization && authorization === process.env.AUTH_ADMIN) {
      return true;
    } else {
      throw new CommonErrorException(
        {
          errorCode: ErrorCodeEnum.UNAUTHORIZED_REQUEST,
          detailCode: DetailCodeEnum.TOKEN_MISMATCH,
        },
        401,
      );
    }
  }
}
