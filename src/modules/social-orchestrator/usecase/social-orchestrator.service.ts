import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { FacebookRequest } from 'src/common/api/facebook';
import { InstagramRequest } from 'src/common/api/instagram';
import { TwitterRequest } from 'src/common/api/twitter';
import { retryPromise } from 'src/common/retryable-promise';

@Injectable()
export class SocialMediaOrchestratorService {
  constructor(
    @Inject('FacebookRequest')
    private facebookRequest: FacebookRequest,
    @Inject('InstagramRequest')
    private instagramRequest: InstagramRequest,
    @Inject('TwitterRequest')
    private twitterRequest: TwitterRequest,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async findAll() {
    let facebook = await this.cacheManager.get('facebook@feed');
    if (!facebook) {
      facebook = await retryPromise<any>({
        promise: this.facebookRequest.feed(),
        args: [this.facebookRequest.URL],
        retries: 4,
        timeout: 3000,
      });
      await this.cacheManager.set('facebook@feed', facebook, { ttl: 10 });
    }

    let instagram = await this.cacheManager.get('instagram@feed');
    if (!instagram) {
      instagram = await retryPromise<any>({
        promise: this.instagramRequest.feed(),
        args: [this.instagramRequest.URL],
        retries: 4,
        timeout: 3000,
      });
      await this.cacheManager.set('instagram@feed', instagram, { ttl: 10 });
    }

    let twitter = await this.cacheManager.get('twitter@feed');
    if (!twitter) {
      twitter = await retryPromise<any>({
        promise: this.twitterRequest.feed(),
        args: [this.twitterRequest.URL],
        retries: 4,
        timeout: 3000,
      });
      await this.cacheManager.set('twitter@feed', twitter, { ttl: 10 });
    }

    return { facebook, twitter, instagram };
  }
}
