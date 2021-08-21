import { Test, TestingModule } from '@nestjs/testing';
import { ClientFactory } from '../interfaces/client-factory';
import { FacebookRequest } from './facebook';

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

describe('FacebookRequest', () => {
  let service: FacebookRequest;

  beforeEach(async () => {
    const HttpClientProvider = {
      provide: 'HttpClient',
      useClass: MockHttpClient,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookRequest, HttpClientProvider],
    }).compile();

    service = module.get<FacebookRequest>(FacebookRequest);
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
