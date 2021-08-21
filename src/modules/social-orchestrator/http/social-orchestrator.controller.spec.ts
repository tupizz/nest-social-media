import { Test, TestingModule } from '@nestjs/testing';
import { SocialOrchestratorController } from './social-orchestrator.controller';
import { SocialOrchestratorModule } from '../social-orchestrator.module';

describe('SocialOrchestratorController', () => {
  let controller: SocialOrchestratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SocialOrchestratorModule],
    }).compile();

    controller = module.get<SocialOrchestratorController>(SocialOrchestratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
