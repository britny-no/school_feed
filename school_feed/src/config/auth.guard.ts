import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    // 약속된 키값으로 올리면 인증
    // 실 개발시 복호화 가능한 방식으로 암호화한 jwt 유효성 검증
    return authorization && authorization === process.env.AUTH_ADMIN;
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
    return authorization && authorization === process.env.AUTH_STUDENT;
  }
}
