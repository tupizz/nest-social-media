import { Module } from '@nestjs/common';
import { SocialOrchestratorService } from './usecase/social-orchestrator.service';
import { SocialOrchestratorController } from './http/social-orchestrator.controller';

@Module({
  controllers: [SocialOrchestratorController],
  providers: [SocialOrchestratorService],
})
export class SocialOrchestratorModule {}
