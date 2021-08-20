import { CacheModule, Module } from '@nestjs/common';
import { SocialMediaOrchestratorService } from './usecase/social-orchestrator.service';
import { SocialOrchestratorController } from './http/social-orchestrator.controller';
import { CommonModule } from '../../common/common.module';

@Module({
  controllers: [SocialOrchestratorController],
  providers: [SocialMediaOrchestratorService],
  imports: [
    CommonModule,
    CacheModule.register({
      ttl: 10,
      max: 9,
    }),
  ],
})
export class SocialOrchestratorModule {}
