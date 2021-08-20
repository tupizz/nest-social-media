import { Test, TestingModule } from '@nestjs/testing';
import { SocialOrchestratorController } from './social-orchestrator.controller';
import { SocialOrchestratorService } from '../usecase/social-orchestrator.service';

describe('SocialOrchestratorController', () => {
  let controller: SocialOrchestratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialOrchestratorController],
      providers: [SocialOrchestratorService],
    }).compile();

    controller = module.get<SocialOrchestratorController>(
      SocialOrchestratorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
