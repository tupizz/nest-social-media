import { Controller, Get } from '@nestjs/common';
import { SocialOrchestratorService } from '../usecase/social-orchestrator.service';

@Controller()
export class SocialOrchestratorController {
  constructor(
    private readonly socialOrchestratorService: SocialOrchestratorService,
  ) {}

  @Get()
  findAll() {
    return this.socialOrchestratorService.findAll();
  }
}
