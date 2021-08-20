import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { FacebookRequest } from 'src/common/api/facebook';
import { InstagramRequest } from 'src/common/api/instagram';
import { TwitterRequest } from 'src/common/api/twitter';
import { SocialMediaRequest } from 'src/common/interfaces/social-media-request';
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
    const facebook = await this.callOrGetFromCache(this.facebookRequest, 'facebook@feed');
    const instagram = await this.callOrGetFromCache(this.instagramRequest, 'instagram@feed');
    const twitter = await this.callOrGetFromCache(this.twitterRequest, 'twitter@feed');
    return { facebook, twitter, instagram };
  }

  private async callOrGetFromCache(request: SocialMediaRequest<any>, cacheName: string) {
    let value = await this.cacheManager.get(cacheName);
    if (!value) {
      value = await retryPromise<any>({
        promise: request.feed(),
        args: [request.URL],
        retries: 4,
        timeout: 3000,
      });
      await this.cacheManager.set(cacheName, value, { ttl: 30 });
    }
    return value;
  }
}
