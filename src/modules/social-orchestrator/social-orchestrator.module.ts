import { Module } from '@nestjs/common';
import { SocialOrchestratorService } from './usecase/social-orchestrator.service';
import { SocialOrchestratorController } from './http/social-orchestrator.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SocialOrchestratorController],
  providers: [SocialOrchestratorService],
  imports: [CommonModule],
})
export class SocialOrchestratorModule {}
