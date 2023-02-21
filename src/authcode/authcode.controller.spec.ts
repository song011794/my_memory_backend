import { Test, TestingModule } from '@nestjs/testing';
import { AuthcodeController } from './authcode.controller';
import { AuthcodeService } from './authcode.service';

describe('AuthcodeController', () => {
  let controller: AuthcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthcodeController],
      providers: [AuthcodeService],
    }).compile();

    controller = module.get<AuthcodeController>(AuthcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
