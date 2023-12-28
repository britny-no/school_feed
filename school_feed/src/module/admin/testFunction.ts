import { getRepositoryToken } from '@nestjs/typeorm';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { AdminRepository } from '@App/module/admin/repository/admin.repository';
import { NewsRepository } from '@App/module/news/repository/news.repository';
import { SubscribeRepository } from '@App/module/student/repository/subscribe.repository';

const MockPageRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),

  createPage: PageRepository.prototype.createPage,
  checkPageAuth: PageRepository.prototype.checkPageAuth,
};

export type MockPageRepositoryType =
  | Partial<Record<keyof PageRepository, jest.Mock>>
  | Partial<PageRepository>;

export const MockPageRepositoryProvider = {
  provide: getRepositoryToken(PageRepository),
  useValue: MockPageRepository,
};

const MockAdminRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),

  checkUser: AdminRepository.prototype.checkUser,
  // checkUser: jest.fn(),
};

export type MockAdminRepositoryType =
  | Partial<Record<keyof AdminRepository, jest.Mock>>
  | Partial<AdminRepository>;

export const MockAdminRepositoryProvider = {
  provide: getRepositoryToken(AdminRepository),
  useValue: MockAdminRepository,
};

const MockNewsRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),

  createNews: NewsRepository.prototype.createNews,
  reviseNews: NewsRepository.prototype.reviseNews,
  deleteNews: NewsRepository.prototype.deleteNews,
};

export type MockNewsRepositoryType =
  | Partial<Record<keyof NewsRepository, jest.Mock>>
  | Partial<NewsRepository>;

export const MockNewsRepositoryProvider = {
  provide: getRepositoryToken(NewsRepository),
  useValue: MockNewsRepository,
};

const MockSubscribeRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),

  getSubscribers: SubscribeRepository.prototype.getSubscribers,
};

export type MockSubscribeRepositoryType =
  | Partial<Record<keyof SubscribeRepository, jest.Mock>>
  | Partial<SubscribeRepository>;

export const MockSubscribeRepositoryProvider = {
  provide: getRepositoryToken(SubscribeRepository),
  useValue: MockSubscribeRepository,
};
