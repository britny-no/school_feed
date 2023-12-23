import {
  UseGuards,
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { AdminAuthGuard } from 'config/auth.guard';
import { createPageReqDto } from './dto/request/createPage.dto';

import { PageService } from 'page/page.service';

@Controller('admin')
@ApiTags('관리자 API')
export class AdminController {
  constructor(private pageService: PageService) {}

  @Post('/page')
  @ApiOperation({
    summary: '페이지 생성 API',
    description: '페이지를 생성한다.',
  })
  @UseGuards(AdminAuthGuard)
  createPage(@Body() body: createPageReqDto): string {
    // this.RmqService.sendMsg('123123');
    try {
      console.log(body);
      // this.pageService.createPage(body);
    } catch (err) {}
    return 'success';
  }
}
