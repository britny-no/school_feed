import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AdminService } from './admin.service';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { RmqService } from '@App/module/rmq/rmq.service';
import { PageEntity } from '@App/module/page/entity/page.entity';
// import { RmqModule } from '@App/module/rmq/rmq.module';

const mockRepository = () => {
  createQueryBuilder: jest.fn();
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AdminService', () => {
  let adminService: AdminService;
  // let rmqService: RmqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        PageRepository,
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
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
  });
});
