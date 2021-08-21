import { Injectable, Logger } from '@nestjs/common';
import { HttpClient } from '../helpers/http-client';
import { SocialMediaRequest } from '../interfaces/social-media-request';

export type FacebookData = {
  name: string;
  status: string;
}[];

@Injectable()
export class FacebookRequest implements SocialMediaRequest<FacebookData> {
  private readonly logger = new Logger(FacebookRequest.name);

  public URL = '/facebook';

  constructor(private httpClient: HttpClient) {}

  async feed() {
    const result = await this.httpClient.create().get<FacebookData>(this.URL);
    this.logger.log(JSON.stringify(result.data));
    return result.data;
  }
}
