import { Injectable } from '@nestjs/common';
import { codeFightApi } from '../helpers/axios';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type FacebookData = {
  name: string;
  status: string;
}[];

@Injectable()
export class FacebookRequest implements SocialMediaRequest<FacebookData> {
  public URL = '/facebook';
  async feed() {
    const result = await codeFightApi.get<FacebookData>(this.URL);
    return result.data;
  }
}
