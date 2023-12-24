import {
  UseGuards,
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { AdminAuthGuard } from 'decorator/auth.decorator';
import { CreatePageReqDto } from './dto/request/createPage.dto';
import { CreatePageResDto } from './dto/response/createPage.dto';
import { AdminService } from 'module/admin/admin.service';

import { ControllerResult } from '../../interface/index.interface';

import { ApiCommonResponse } from 'decorator/apiCommon.decorator';
import { ResponseFormatInterceptor } from 'interceptor/responseFormat.interceptor';
import { QueryErrorResponseFilter } from 'filter/queryErrorResponse.filter';
import { CommonErrorResponseFilter } from 'filter/commonErrorResponse.filter';
import { ValidationErrorResponseFilter } from 'filter/validationErrorResponse.filter';

@Controller('admin')
@ApiTags('관리자 API')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({
    summary: '페이지 생성 API',
    description: '페이지를 생성한다.',
  })
  @ApiExtraModels(CreatePageResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(CreatePageResDto),
  })
  @Post('/page')
  @UseGuards(AdminAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async createPage(
    @Body() body: CreatePageReqDto,
  ): Promise<ControllerResult<CreatePageResDto>> {
    // this.RmqService.sendMsg('123123');
    try {
      const data = await this.adminService.createPage(body);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
