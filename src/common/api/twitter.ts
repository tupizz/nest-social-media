import { Injectable } from '@nestjs/common';
import { codeFightApi } from '../helpers/axios';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type TwitterData = {
  username: string;
  tweet: string;
}[];

@Injectable()
export class TwitterRequest implements SocialMediaRequest<TwitterData> {
  public URL = '/twitter';

  async feed() {
    const result = await codeFightApi.get<TwitterData>(this.URL);
    return result.data;
  }
}
