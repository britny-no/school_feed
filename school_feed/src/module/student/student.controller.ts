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

import { StudentAuthGuard } from '@App/decorator/auth.decorator';
import { GetPagesReqDto } from './dto/request/getPages.dto';
import { GetPagesResDto } from './dto/response/getPages.dto';
import { SubscribePageReqDto } from './dto/request/subscribePage.dto';
import { SubscribePageResDto } from './dto/response/subscribePage.dto';
import { StudentService } from '@App/module/student/student.service';

import { ControllerResult } from '@App/interface/index.interface';

import { ApiCommonResponse } from '@App/decorator/apiCommon.decorator';
import { ResponseFormatInterceptor } from '@App/interceptor/responseFormat.interceptor';
import { QueryErrorResponseFilter } from '@App/filter/queryErrorResponse.filter';
import { CommonErrorResponseFilter } from '@App/filter/commonErrorResponse.filter';
import { ValidationErrorResponseFilter } from '@App/filter/validationErrorResponse.filter';

@Controller('student')
@ApiTags('학생 API')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @ApiOperation({
    summary: '비구독 페이지 조회 API',
    description: '구독중이지 않은 페이지 조회한다',
  })
  @ApiExtraModels(GetPagesResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetPagesResDto),
  })
  @Get('/non-subscribe-pages')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getUnSubscribePages(
    @Query() query: GetPagesReqDto,
  ): Promise<ControllerResult<GetPagesResDto>> {
    try {
      return await this.studentService.getNonSubscribePages(query);
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '구독 페이지 조회 API',
    description: '구독중인 페이지 조회한다',
  })
  @ApiExtraModels(GetPagesResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetPagesResDto),
  })
  @Get('/subscribe-pages')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getSubscribePages(
    @Query() query: GetPagesReqDto,
  ): Promise<ControllerResult<GetPagesResDto>> {
    try {
      return await this.studentService.getSubscribePages(query);
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '페이지 구독 API',
    description: '페이지를 구독한다',
  })
  @ApiExtraModels(SubscribePageResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(SubscribePageResDto),
  })
  @Post('/page')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async subscribePage(
    @Body() body: SubscribePageReqDto,
  ): Promise<ControllerResult<SubscribePageResDto>> {
    try {
      return await this.studentService.subscribePage(body);
    } catch (err) {
      throw err;
    }
  }
}
