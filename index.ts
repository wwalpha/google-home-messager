require('./init');

import Config from './aws-exports';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as Cognito from './src/aws/cognito';
import * as home from './src/googlehome';
import * as Observable from 'zen-observable';

Amplify.configure(Config);

const username: string = 'test11';
const password: string = 'Test1234567890';

home.ip('172.16.80.3', 'ja');

Cognito.login(username, password).then((user) => {

  const realtimeResults = (subscription: any) => {
    console.log('realtime receive');
    if (subscription) {
      const { signedURL } = subscription.value.data.subscribeToRecvMessage;

      home.play(signedURL);
    }
  };

  const recvMessage = `subscription SubscribeToRecvMessage {
    subscribeToRecvMessage {
      signedURL
    }
  }`;

  // Subscribe with eventId 123
  const subscription = (API.graphql(
    graphqlOperation(recvMessage),
  ) as Observable<any>).subscribe({
    next: (e: any) => realtimeResults(e),
  });
}).catch(console.log);

process.on('unhandledRejection', console.dir);
