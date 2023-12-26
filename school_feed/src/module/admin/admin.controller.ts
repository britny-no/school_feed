import {
  UseGuards,
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Delete,
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
import { CreateNewsResDto } from './dto/response/createNews.dto';
import { ReviseNewsReqDto } from './dto/request/reviseNews.dto';
import { ReviseNewsResDto } from './dto/response/reviseNews.dto';
import { DeleteNewsReqDto } from './dto/request/deleteNews.dto';
import { DeleteNewsResDto } from './dto/response/deleteNews.dto';

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
  @ApiExtraModels(CreateNewsResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(CreateNewsResDto),
  })
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
  ): Promise<ControllerResult<CreateNewsResDto>> {
    try {
      const data = await this.adminService.createNews(body);
      return data;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '소식 수정 API',
    description: '소식을 수정한다.',
  })
  @ApiExtraModels(ReviseNewsResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(ReviseNewsResDto),
  })
  @Put('/news')
  @UseGuards(AdminAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async reviseNews(
    @Body() body: ReviseNewsReqDto,
  ): Promise<ControllerResult<ReviseNewsResDto>> {
    try {
      const data = await this.adminService.reviseNews(body);
      return data;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '소식 삭제 API',
    description: '소식을 삭제한다.',
  })
  @ApiExtraModels(DeleteNewsResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(DeleteNewsResDto),
  })
  @Delete('/news')
  @UseGuards(AdminAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async deleteNews(
    @Body() body: DeleteNewsReqDto,
  ): Promise<ControllerResult<DeleteNewsResDto>> {
    try {
      const data = await this.adminService.deleteNews(body);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
