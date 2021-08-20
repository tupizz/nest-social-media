import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { FacebookRequest } from '../../../common/api/facebook';
import { InstagramRequest } from '../../../common/api/instagram';
import { TwitterRequest } from '../../../common/api/twitter';
import { SocialMediaRequest } from '../../../common/interfaces/social-media-request';

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
      value = await request.feed();
      await this.cacheManager.set(cacheName, value, { ttl: 30 });
    }
    return value;
  }
}
