import { AWSAppSyncClientOptions, AWSAppSyncClient } from 'aws-appsync';
import { SubscriptionOptions } from 'apollo-client';

let client: AWSAppSyncClient<any>;

export const config = (options: AWSAppSyncClientOptions) => {
  client = new AWSAppSyncClient({
    url: options.url,
    region: options.region,
    auth: options.auth,
  });
};

export const subscribe = (query: SubscriptionOptions, realtime: any) => {
  if (!client) throw new Error('client not init');

  client.hydrated().then((client: AWSAppSyncClient<any>) => {
    const observable = client.subscribe(query);

    observable.subscribe({
      next: realtime,
      complete: console.log,
      error: console.log,
    });
  });
};
