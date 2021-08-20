import { Inject, Injectable } from '@nestjs/common';
import { FacebookRequest } from 'src/common/api/facebook';
import { InstagramRequest } from 'src/common/api/instagram';
import { TwitterRequest } from 'src/common/api/twitter';
import { retryPromise } from 'src/common/retryable-promise';

@Injectable()
export class SocialOrchestratorService {
  constructor(
    @Inject('FacebookRequest')
    private facebookRequest: FacebookRequest,
    @Inject('InstagramRequest')
    private instagramRequest: InstagramRequest,
    @Inject('TwitterRequest')
    private twitterRequest: TwitterRequest,
  ) {}

  async findAll() {
    const facebook = await retryPromise<any>({
      promise: this.facebookRequest.feed(),
      args: [this.facebookRequest.URL],
      retries: 4,
      timeout: 3000,
    });

    const instagram = await retryPromise<any>({
      promise: this.instagramRequest.feed(),
      args: [this.instagramRequest.URL],
      retries: 4,
      timeout: 3000,
    });

    const twitter = await retryPromise<any>({
      promise: this.twitterRequest.feed(),
      args: [this.twitterRequest.URL],
      retries: 4,
      timeout: 3000,
    });

    return { facebook, twitter, instagram };
  }
}
