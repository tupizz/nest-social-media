import { CacheModule, Module } from '@nestjs/common';
import { SocialMediaOrchestratorService } from './usecase/social-orchestrator.service';
import { SocialOrchestratorController } from './http/social-orchestrator.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SocialOrchestratorController],
  providers: [SocialMediaOrchestratorService],
  imports: [CommonModule, CacheModule.register()],
})
export class SocialOrchestratorModule {}
