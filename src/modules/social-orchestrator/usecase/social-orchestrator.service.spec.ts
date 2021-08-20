import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaOrchestratorService } from './social-orchestrator.service';

describe('SocialOrchestratorService', () => {
  let service: SocialMediaOrchestratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediaOrchestratorService],
    }).compile();

    service = module.get<SocialMediaOrchestratorService>(SocialMediaOrchestratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
