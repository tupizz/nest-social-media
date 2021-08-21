import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { ClientFactory } from '../interfaces/client-factory';

@Injectable()
export class HttpClient implements ClientFactory<AxiosInstance> {
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
