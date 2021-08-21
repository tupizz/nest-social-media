import { Test, TestingModule } from '@nestjs/testing';
import { ClientFactory } from '../interfaces/client-factory';
import { InstagramRequest } from './instagram';

jest.setTimeout(30_000);

class MockHttpClient implements ClientFactory<any> {
  create() {
    return {
      get(url: string) {
        return {
          data: [
            {
              username: 'tupizz',
              tweet: 'hello world',
            },
          ],
        };
      },
    };
  }
}

describe('InstagramRequest', () => {
  let service: InstagramRequest;

  beforeEach(async () => {
    const HttpClientProvider = {
      provide: 'HttpClient',
      useClass: MockHttpClient,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [InstagramRequest, HttpClientProvider],
    }).compile();

    service = module.get<InstagramRequest>(InstagramRequest);
  });

  describe('feed()', () => {
    test('should return all the medias correctly', async () => {
      expect(await service.feed()).toStrictEqual([
        {
          username: 'tupizz',
          tweet: 'hello world',
        },
      ]);
    });
  });
});
