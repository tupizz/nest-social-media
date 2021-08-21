import { Test, TestingModule } from '@nestjs/testing';
import { TwitterRequest } from './twitter';
import { ClientFactory } from '../interfaces/client-factory';

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

describe('TwitterRequest', () => {
  let service: TwitterRequest;

  beforeEach(async () => {
    const HttpClientProvider = {
      provide: 'HttpClient',
      useClass: MockHttpClient,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitterRequest, HttpClientProvider],
    }).compile();

    service = module.get<TwitterRequest>(TwitterRequest);
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
