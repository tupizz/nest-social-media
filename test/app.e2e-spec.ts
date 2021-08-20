import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(
        JSON.stringify({
          facebook: [
            {
              name: 'Some Friend',
              status: "Here's some photos of my holiday. Look how much more fun I'm having than you are!",
            },
            { name: 'Drama Pig', status: 'I am in a hospital. I will not tell you anything about why I am here.' },
          ],
          twitter: [
            {
              username: '@GuyEndoreKaiser',
              tweet:
                'If you live to be 100, you should make up some fake reason why, just to mess with people... like claim you ate a pinecone every single day.',
            },
            {
              username: '@mikeleffingwell',
              tweet: "STOP TELLING ME YOUR NEWBORN'S WEIGHT AND LENGTH I DON'T KNOW WHAT TO DO WITH THAT INFORMATION.",
            },
          ],
          instagram: [
            { username: 'hipster1', picture: 'food' },
            { username: 'hipster2', picture: 'coffee' },
            { username: 'hipster3', picture: 'coffee' },
            { username: 'hipster4', picture: 'food' },
            { username: 'hipster5', picture: 'this one is of a cat' },
          ],
        }),
      );
  });
});
