import { Test, TestingModule } from '@nestjs/testing';
import { SocialOrchestratorController } from './social-orchestrator.controller';
import { SocialMediaOrchestratorService } from '../usecase/social-orchestrator.service';

describe('SocialOrchestratorController', () => {
  let controller: SocialOrchestratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialOrchestratorController],
      providers: [SocialMediaOrchestratorService],
    }).compile();

    controller = module.get<SocialOrchestratorController>(SocialOrchestratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
