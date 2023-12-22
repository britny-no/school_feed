import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { RmqService } from 'rmq/rmq.service';

import { createPageReqDto } from './dto/request/createPage.dto';
@Controller('admin')
export class AdminController {
  constructor(private RmqService: RmqService) {}

  @Post('/page')
  createPage(@Body() body: createPageReqDto): string {
    // this.RmqService.sendMsg('123123');
    console.log(body);
    return 'success';
  }
}
