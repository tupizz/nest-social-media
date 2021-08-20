import axios from 'axios';

export interface RetryPromiseArgs<T> {
  promise: Promise<T>;
  retries: number;
  timeout?: number;
  args: string[];
}

const sleep = (time: number) => new Promise((r) => setTimeout(r, time, []));

export async function retryPromise<T>({ promise, retries, timeout, args }: RetryPromiseArgs<T>): Promise<T> {
  let timeoutHandle: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((resolve, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error('Timeout Error')), timeout ?? 10_000);
  });

  try {
    return await Promise.race([promise, timeoutPromise]).then((result) => {
      clearTimeout(timeoutHandle);
      return result;
    });
  } catch (error) {
    if (retries === 0) {
      throw new Error(error);
    }

    await sleep(500);

    return retryPromise({
      promise: axios.get(`http://codefight.davidbanham.com/${args[0]}`).then((result) => result.data),
      args,
      retries: --retries,
      timeout,
    });
  }
}
