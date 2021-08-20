import { Test, TestingModule } from '@nestjs/testing';
import { SocialOrchestratorService } from './social-orchestrator.service';

describe('SocialOrchestratorService', () => {
  let service: SocialOrchestratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialOrchestratorService],
    }).compile();

    service = module.get<SocialOrchestratorService>(SocialOrchestratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
