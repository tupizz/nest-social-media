import { Injectable, Logger } from '@nestjs/common';
import { codeFightApi } from '../helpers/axios';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type InstagramData = {
  username: string;
  picture: string;
}[];

@Injectable()
export class InstagramRequest implements SocialMediaRequest<InstagramData> {
  private readonly logger = new Logger(InstagramRequest.name);

  public URL = '/instagram';

  async feed() {
    const result = await codeFightApi.get<InstagramData>(this.URL);
    this.logger.log(JSON.stringify(result.data));
    return result.data;
  }
}
