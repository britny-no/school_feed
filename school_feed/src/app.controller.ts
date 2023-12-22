import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('기타 API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '작동 확인 API',
    description: '서버 작동을 확인한다.',
  })
  // @ApiOkResponse({ description: '서버 작동을 확인한다.', type: 'string' })
  getHello(): string {
    return this.appService.getHello();
  }
}
