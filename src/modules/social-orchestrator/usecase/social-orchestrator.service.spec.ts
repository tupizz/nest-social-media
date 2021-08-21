import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaOrchestratorService } from './social-orchestrator.service';
import { CacheModule } from '@nestjs/common';
import { SocialMediaRequest } from 'src/common/interfaces/social-media-request';

jest.setTimeout(30_000);

class Mock implements SocialMediaRequest<any> {
  URL = '';
  async feed() {
    return [];
  }
}

describe('SocialOrchestratorService', () => {
  let service: SocialMediaOrchestratorService;

  beforeEach(async () => {
    const FacebookProvider = {
      provide: 'FacebookRequest',
      useClass: Mock,
    };

    const InstagramProvider = {
      provide: 'InstagramRequest',
      useClass: Mock,
    };

    const TwitterProvider = {
      provide: 'TwitterRequest',
      useClass: Mock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediaOrchestratorService, FacebookProvider, InstagramProvider, TwitterProvider],
      imports: [CacheModule.register()],
    }).compile();

    service = module.get<SocialMediaOrchestratorService>(SocialMediaOrchestratorService);
  });

  describe('findAll', () => {
    test('should return all the medias correctly', async () => {
      expect(await service.findAll()).toStrictEqual({
        facebook: [],
        twitter: [],
        instagram: [],
      });
    });
  });
});
