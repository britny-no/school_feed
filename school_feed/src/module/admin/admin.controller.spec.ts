import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { CreatePageReqDto } from './dto/request/createPage.dto';
describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('컨트롤러 정의', () => {
    expect(controller).toBeDefined();
  });
  describe('유저 정보 수정', () => {
    it('페이지 생성에 성공한다', () => {
      const data: CreatePageReqDto = {
        pageName: '페이지명',
        schoolName: '학교명',
        shortDescription: '설명',
      };
      expect(controller.createPage(data)).toBeDefined();
    });

    it('파라미터 값이 이상해, 페이지 생성에 실패한다', () => {
      expect(controller).toBeDefined();
    });

    it('약속된 파라미터가 아닌게 들어와, 페이지 생성에 실패한다', () => {
      expect(controller).toBeDefined();
    });

    it('중복된 학교 or 페이지명으로 페이지 생성에 실패한다', () => {
      expect(controller).toBeDefined();
    });
  });
});
