import {
  UseGuards,
  Controller,
  Get,
  Post,
  Delete,
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
import { plainToInstance } from 'class-transformer';

import { StudentAuthGuard } from '@App/decorator/auth.decorator';
import { GetPagesReqDto } from './dto/request/getPages.dto';
import { GetPagesResDto } from './dto/response/getPages.dto';
import { SubscribePageReqDto } from './dto/request/subscribePage.dto';
import { SubscribePageResDto } from './dto/response/subscribePage.dto';
import { GetNewsFeedReqDto } from './dto/request/getNewsFeed.dto';
import { GetNewsFeedResDto } from './dto/response/getNewsFeed.dto';
import { GetNewsFeedBySchoolReqDto } from './dto/request/getNewsFeedBySchool.dto';
import { UnLockSubscribePageReqDto } from './dto/request/unLockSubscribePage.dto';
import { UnLockSubscribePageResDto } from './dto/response/unLockSubscribePage.dto';
import { StudentService } from '@App/module/student/student.service';

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
  ): Promise<GetPagesResDto> {
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
  ): Promise<GetPagesResDto> {
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
  ): Promise<SubscribePageResDto> {
    try {
      return await this.studentService.subscribePage(body);
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '뉴스피드 조회 API',
    description: '학교 소식이 한번에 보이는 뉴스피드를 조회한다',
  })
  @ApiExtraModels(GetNewsFeedResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetNewsFeedResDto),
  })
  @Get('/news-feed')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getNewsFeed(
    @Query() query: GetNewsFeedReqDto,
  ): Promise<GetNewsFeedResDto> {
    try {
      const newsFeeds = await this.studentService.getNewsFeed(query);
      const result = plainToInstance(GetNewsFeedResDto, newsFeeds);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '학교별 뉴스피드 조회 API',
    description: '학교 소식이 한번에 보이는 뉴스피드를 조회한다',
  })
  @ApiExtraModels(GetNewsFeedResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetNewsFeedResDto),
  })
  @Get('/news-feed-by-school')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getNewsFeedBySchool(
    @Query() query: GetNewsFeedBySchoolReqDto,
  ): Promise<GetNewsFeedResDto> {
    try {
      const newsFeeds = await this.studentService.getNewsFeedBySchool(query);
      const result = plainToInstance(GetNewsFeedResDto, newsFeeds);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '구독 해제 API',
    description: '구독 해제한다(구독이 db insert로 이뤄지기에, delete)',
  })
  @ApiExtraModels(UnLockSubscribePageResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(UnLockSubscribePageResDto),
  })
  @Delete('/page')
  @UseGuards(StudentAuthGuard)
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async unLockSubscribePages(
    @Body() body: UnLockSubscribePageReqDto,
  ): Promise<UnLockSubscribePageResDto> {
    try {
      const result = await this.studentService.unLockSubscribePage(body);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
