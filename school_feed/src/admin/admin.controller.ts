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

@Controller('admin')
export class AdminController {
  constructor(private RmqService: RmqService) {}

  @Get('/rmq-test')
  getContents(): string {
    this.RmqService.sendMsg('123123');
    return 'success';
  }
}
