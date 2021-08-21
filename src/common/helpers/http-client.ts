import { Injectable } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpClient {
  private readonly RETRIES = 3;
  private readonly URL = 'http://codefight.davidbanham.com';

  create() {
    const client = axios.create({
      baseURL: this.URL,
    });

    axiosRetry(client, {
      retries: this.RETRIES,
      retryDelay() {
        return 200;
      },
    });

    return client;
  }
}
