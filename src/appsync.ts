import { AWSAppSyncClientOptions, AWSAppSyncClient } from 'aws-appsync';
import { SubscriptionOptions } from 'apollo-client';
import { Observable } from 'zen-observable-ts';

let client: AWSAppSyncClient<any>;

export const config = (options: AWSAppSyncClientOptions) => {
  console.log(options);

  client = new AWSAppSyncClient({
    url: options.url,
    region: options.region,
    auth: options.auth,
  });
};

export const subscribe = (query: SubscriptionOptions): Promise<Observable<any>> => new Promise((resolve, reject) => {
  if (!client) {
    reject('client not init');
    return;
  }

  client.hydrated()
    .then((client: AWSAppSyncClient<any>) => {
      const observable = client.subscribe(query);
      resolve(observable);
    })
    .catch(console.log);
});
