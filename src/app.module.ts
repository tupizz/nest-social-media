import { Module } from '@nestjs/common';
import { SocialOrchestratorModule } from './modules/social-orchestrator/social-orchestrator.module';

@Module({
  imports: [SocialOrchestratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
