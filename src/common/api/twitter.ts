import { Injectable, Logger } from '@nestjs/common';
import { HttpClient } from '../helpers/http-client';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type TwitterData = {
  username: string;
  tweet: string;
}[];

@Injectable()
export class TwitterRequest implements SocialMediaRequest<TwitterData> {
  private readonly logger = new Logger(TwitterRequest.name);

  public URL = '/twitter';

  constructor(private httpClient: HttpClient) {}

  async feed() {
    const result = await this.httpClient.create().get<TwitterData>(this.URL);
    this.logger.log(JSON.stringify(result.data));
    return result.data;
  }
}
