import { Test, TestingModule } from '@nestjs/testing';
import { InsertResult, Repository } from 'typeorm';
import { AdminService } from './admin.service';
import { RmqService } from '@App/module/rmq/rmq.service';

import { PageRepository } from '@App/module/page/repository/page.repository';
import { AdminRepository } from '@App/module/admin/repository/admin.repository';
import { NewsRepository } from '@App/module/news/repository/news.repository';
import { SubscribeRepository } from '@App/module/student/repository/subscribe.repository';

import {
  MockPageRepositoryType,
  MockPageRepositoryProvider,
  MockAdminRepositoryType,
  MockAdminRepositoryProvider,
  MockNewsRepositoryType,
  MockNewsRepositoryProvider,
  MockSubscribeRepositoryType,
  MockSubscribeRepositoryProvider,
} from './testFunction';

describe('AdminService', () => {
  let adminService: AdminService;
  let mockPageRepository: MockPageRepositoryType;
  let mockAdminRepository: MockAdminRepositoryType;
  let mockNewsRepository: MockNewsRepositoryType;
  let mockSubscribeRepository: MockSubscribeRepositoryType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        MockPageRepositoryProvider,
        MockAdminRepositoryProvider,
        MockNewsRepositoryProvider,
        MockSubscribeRepositoryProvider,

        {
          provide: RmqService,
          useValue: {
            sendMsg: (msg) => {
              return 'sample token';
            },
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    mockPageRepository = module.get<PageRepository>(PageRepository);
    mockAdminRepository = module.get<AdminRepository>(AdminRepository);
    mockNewsRepository = module.get<NewsRepository>(NewsRepository);
    mockSubscribeRepository =
      module.get<SubscribeRepository>(SubscribeRepository);
  });

  it('서비스 정의되어 있는지', () => {
    expect(adminService).toBeDefined();
  });

  it('페이지가 생성된다', async () => {
    const insertResult: InsertResult = null;
    jest
      .spyOn(mockAdminRepository, 'findOne')
      .mockResolvedValue(Promise.resolve('123'));
    jest
      .spyOn(mockPageRepository, 'insert')
      .mockResolvedValue(Promise.resolve(insertResult));

    try {
      const result = await adminService.createPage({
        adminIndex: '1',
        schoolName: '123',
        pageName: '1234',
        shortDescription: '123',
      });
      expect(result).toEqual({
        data: null,
        msg: '페이지 생성에 성공했습니다',
      });
    } catch (err) {
      expect(1).toEqual(2);
    }
  });

  it('페이지가 생성 안된다[등록된 유저의 요청이 아니다]', async () => {
    const insertResult: InsertResult = null;
    jest
      .spyOn(mockAdminRepository, 'findOne')
      .mockResolvedValue(Promise.resolve(insertResult));

    jest
      .spyOn(mockPageRepository, 'insert')
      .mockResolvedValue(Promise.resolve(insertResult));

    try {
      await adminService.createPage({
        adminIndex: '1',
        schoolName: '123',
        pageName: '1234',
        shortDescription: '123',
      });
    } catch (err) {
      switch (err.status) {
        case 403:
          expect(err.response).toEqual({
            errorCode: 'INVALID_DATA',
            detailCode: 'NO_USER',
          });
          break;
        default:
          expect(1).toEqual(2);
      }
    }
  });

  it('페이지가 생성 안된다[학교명 or 페이지명 중복]', async () => {
    jest
      .spyOn(mockAdminRepository, 'findOne')
      .mockResolvedValue(Promise.resolve('123'));

    jest.spyOn(mockPageRepository, 'insert').mockResolvedValue(
      Promise.reject({
        code: '23505',
      }),
    );

    try {
      await adminService.createPage({
        adminIndex: '1',
        schoolName: '123',
        pageName: '1234',
        shortDescription: '123',
      });
      expect(1).toEqual(2);
    } catch (err) {
      switch (err.status) {
        case 403:
          expect(err.response).toEqual({
            errorCode: 'INVALID_DATA',
            detailCode: 'DATA_DUPLICATE',
          });
          break;
        default:
          expect(1).toEqual(2);
      }
    }
  });

  it('소식이 생성된다', async () => {
    jest
      .spyOn(mockPageRepository, 'findOne')
      .mockResolvedValue(Promise.resolve('123'));

    jest.spyOn(mockNewsRepository, 'insert').mockResolvedValue(
      Promise.resolve({
        generatedMaps: [{ newsIndex: 1, createDate: '2023-01-01 00:00:11' }],
      }),
    );
    // 구독자가 없다고 가정
    jest
      .spyOn(mockSubscribeRepository, 'getSubscribers')
      .mockResolvedValue(Promise.resolve([]));

    try {
      const result = await adminService.createNews({
        adminIndex: '1',
        pageIndex: '1',
        title: '123',
        contents: '123',
      });
      expect(result).toEqual({
        data: null,
        msg: '소식 등록 성공',
      });
    } catch (err) {
      console.log(err);
      expect(1).toEqual(2);
    }
  });

  it('소식이 생성되지 않는다[관리자가 아닐경우]', async () => {
    jest
      .spyOn(mockPageRepository, 'findOne')
      .mockResolvedValue(Promise.resolve(null));

    try {
      await adminService.createNews({
        adminIndex: '1',
        pageIndex: '1',
        title: '123',
        contents: '123',
      });
      expect(1).toEqual(2);
    } catch (err) {
      switch (err.status) {
        case 403:
          expect(err.response).toEqual({
            errorCode: 'INVALID_DATA',
            detailCode: 'NO_AUTH',
          });
          break;
        default:
          expect(1).toEqual(2);
      }
    }
  });

  it('소식이 생성되지 않는다[createNews에서 generatedMaps리턴 안함 ]', async () => {
    jest
      .spyOn(mockPageRepository, 'findOne')
      .mockResolvedValue(Promise.resolve('123'));

    jest
      .spyOn(mockNewsRepository, 'insert')
      .mockResolvedValue(Promise.resolve({}));

    // 구독자가 없다고 가정
    jest
      .spyOn(mockSubscribeRepository, 'getSubscribers')
      .mockResolvedValue(Promise.resolve([]));

    try {
      await adminService.createNews({
        adminIndex: '1',
        pageIndex: '1',
        title: '123',
        contents: '123',
      });
    } catch (err) {
      switch (err.status) {
        case 500:
          expect(err.response).toEqual({
            errorCode: 'SERVER_ERROR',
            detailCode: 'INSERT_ERROR',
          });
          break;
        default:
          expect(1).toEqual(2);
      }
    }
  });
});
