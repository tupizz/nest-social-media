import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpClient } from '../helpers/http-client';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type InstagramData = {
  username: string;
  picture: string;
}[];

@Injectable()
export class InstagramRequest implements SocialMediaRequest<InstagramData> {
  private readonly logger = new Logger(InstagramRequest.name);

  public URL = '/instagram';

  constructor(@Inject('HttpClient') private httpClient: HttpClient) {}

  async feed() {
    const result = await this.httpClient.create().get<InstagramData>(this.URL);
    this.logger.log(JSON.stringify(result.data));
    return result.data;
  }
}
