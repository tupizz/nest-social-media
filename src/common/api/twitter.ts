import { Injectable, Logger } from '@nestjs/common';
import { codeFightApi } from '../helpers/axios';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type TwitterData = {
  username: string;
  tweet: string;
}[];

@Injectable()
export class TwitterRequest implements SocialMediaRequest<TwitterData> {
  private readonly logger = new Logger(TwitterRequest.name);

  public URL = '/twitter';

  async feed() {
    const result = await codeFightApi.get<TwitterData>(this.URL);
    this.logger.log(JSON.stringify(result.data));
    return result.data;
  }
}
