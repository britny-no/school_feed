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

import { AdminService } from '@App/module/admin/admin.service';

import { AdminAuthGuard } from '@App/decorator/auth.decorator';
import { CreatePageReqDto } from './dto/request/createPage.dto';
import { CreatePageResDto } from './dto/response/createPage.dto';
import { CreateNewsReqDto } from './dto/request/createNews.dto';

import { ControllerResult } from '@App/interface/index.interface';

import { ApiCommonResponse } from '@App/decorator/apiCommon.decorator';
import { ResponseFormatInterceptor } from '@App/interceptor/responseFormat.interceptor';
import { QueryErrorResponseFilter } from '@App/filter/queryErrorResponse.filter';
import { CommonErrorResponseFilter } from '@App/filter/commonErrorResponse.filter';
import { ValidationErrorResponseFilter } from '@App/filter/validationErrorResponse.filter';

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
    try {
      const data = await this.adminService.createPage(body);
      return data;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '소식 생성 API',
    description: '소식을 생성한다.',
  })
  // @ApiExtraModels(CreatePageResDto)
  // @ApiCommonResponse({
  //   $ref: getSchemaPath(CreatePageResDto),
  // })
  @Post('/news')
  @UseGuards(AdminAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async createNews(
    @Body() body: CreateNewsReqDto,
  ): Promise<ControllerResult<CreatePageResDto>> {
    try {
      const data = await this.adminService.createNews(body);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
