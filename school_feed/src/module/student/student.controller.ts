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
import { GetNonSubscribePagesReqDto } from './dto/request/getNonSubscribePages.dto';
import { GetNonSubscribePagesResDto } from './dto/response/getNonSubscribePages.dto';
// import { CreatePageResDto } from './dto/response/createPage.dto';
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
  @ApiExtraModels(GetNonSubscribePagesResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetNonSubscribePagesResDto),
  })
  @Get('/non-subscribe-pages')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async listUnsubscribePages(
    @Query() query: GetNonSubscribePagesReqDto,
  ): Promise<ControllerResult<GetNonSubscribePagesResDto>> {
    try {
      return await this.studentService.getNonSubscribePages(query);
    } catch (err) {
      throw err;
    }
  }
}
