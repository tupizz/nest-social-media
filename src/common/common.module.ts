import { Module } from '@nestjs/common';
import { FacebookRequest } from './api/facebook';
import { InstagramRequest } from './api/instagram';
import { TwitterRequest } from './api/twitter';
import { HttpClient } from './helpers/http-client';

const FacebookRequestService = {
  provide: 'FacebookRequest',
  useClass: FacebookRequest,
};

const InstagramRequestService = {
  provide: 'InstagramRequest',
  useClass: InstagramRequest,
};

const TwitterRequestService = {
  provide: 'TwitterRequest',
  useClass: TwitterRequest,
};

const HttpClientProvider = {
  provide: 'HttpClient',
  useClass: HttpClient,
};

@Module({
  providers: [FacebookRequestService, InstagramRequestService, TwitterRequestService, HttpClientProvider],
  exports: [FacebookRequestService, InstagramRequestService, TwitterRequestService],
})
export class CommonModule {}
