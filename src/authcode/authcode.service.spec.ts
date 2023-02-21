import { Test, TestingModule } from '@nestjs/testing';
import { AuthcodeService } from './authcode.service';

describe('AuthcodeService', () => {
  let service: AuthcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthcodeService],
    }).compile();

    service = module.get<AuthcodeService>(AuthcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
