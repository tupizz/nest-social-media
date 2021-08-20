import { Injectable } from '@nestjs/common';
import { codeFightApi } from '../helpers/axios';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type InstagramData = {
  username: string;
  picture: string;
}[];

@Injectable()
export class InstagramRequest implements SocialMediaRequest<InstagramData> {
  public URL = '/instagram';

  async feed() {
    const result = await codeFightApi.get<InstagramData>(this.URL);
    return result.data;
  }
}
