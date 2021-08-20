import { Module } from '@nestjs/common';

import { SocialOrchestratorModule } from './modules/social-orchestrator/social-orchestrator.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [SocialOrchestratorModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
