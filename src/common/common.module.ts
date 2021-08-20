import { Module } from '@nestjs/common';
import { FacebookRequest } from './api/facebook';
import { InstagramRequest } from './api/instagram';
import { TwitterRequest } from './api/twitter';

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

@Module({
  providers: [FacebookRequestService, InstagramRequestService, TwitterRequestService],
  exports: [FacebookRequestService, InstagramRequestService, TwitterRequestService],
})
export class CommonModule {}
