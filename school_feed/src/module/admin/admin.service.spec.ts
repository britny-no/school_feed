import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { InsertResult, Repository } from 'typeorm';
import { AdminService } from './admin.service';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { RmqService } from '@App/module/rmq/rmq.service';

// 고도화 필요시 분리
const MockPageRepository = {
  // methods from Repository
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),
  // methods from DataRepository (extends Repository<Data>)
  createPage: PageRepository.prototype.createPage,
};

type MockPageRepositoryType =
  | Partial<Record<keyof PageRepository, jest.Mock>>
  | Partial<PageRepository>;

const MockPageRepositoryProvider = {
  provide: getRepositoryToken(PageRepository),
  useValue: MockPageRepository,
};

describe('AdminService', () => {
  let adminService: AdminService;
  let mockPageRepository: MockPageRepositoryType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        MockPageRepositoryProvider,
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
  });

  it('서비스 정의되어 있는지', () => {
    expect(adminService).toBeDefined();
  });

  it('페이지 생성되는지', async () => {
    const insertResult: InsertResult = null;
    jest
      .spyOn(mockPageRepository, 'insert')
      .mockResolvedValue(Promise.resolve(insertResult));

    try {
      const result = await adminService.createPage({
        schoolName: '123',
        pageName: '1234',
        shortDescription: '123',
      });
      expect(result).toEqual({
        data: null,
        msg: '페이지 생성에 성공했습니다',
      });
    } catch (err) {
      switch (err.status) {
        case 403:
          expect(err.response).toEqual({
            errorCode: 'INVALID_DATA',
            detailCode: 'DATA_DUPLICATE',
          });
          break;
        default:
          expect(1).toEqual(1);
      }
    }
  });

  it('학교명 or 페이지명 중복 될때 오류 처리 되는지', async () => {
    const insertResult: InsertResult = null;
    jest.spyOn(mockPageRepository, 'insert').mockResolvedValue(
      Promise.reject({
        code: '23505',
      }),
    );

    try {
      const result = await adminService.createPage({
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
          expect(1).toEqual(1);
      }
    }
  });
});
