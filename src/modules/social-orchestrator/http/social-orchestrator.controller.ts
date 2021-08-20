import { Controller, Get } from '@nestjs/common';
import { SocialMediaOrchestratorService } from '../usecase/social-orchestrator.service';

@Controller()
export class SocialOrchestratorController {
  constructor(private readonly socialOrchestratorService: SocialMediaOrchestratorService) {}

  @Get()
  findAll() {
    return this.socialOrchestratorService.findAll();
  }
}
