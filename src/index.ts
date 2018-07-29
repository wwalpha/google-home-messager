require('./init');

import Config from './aws-exports';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as Cognito from './aws/cognito';
import * as GoogleHome from 'google-home-pusher';
import * as Observable from 'zen-observable';

Amplify.configure(Config);

const username: string = 'google-home-messager';
const password: string = 'Messager-99+';

GoogleHome.ip('172.16.80.3');

Cognito.login(username, password).then((user) => {

  const realtimeResults = (subscription: any) => {
    if (subscription) {
      const { signedURL, message } = subscription.value.data.subscribeToRecvMessage;

      console.log('signedURL', signedURL);
      console.log('message', message);

      if (signedURL) {
        GoogleHome.play(signedURL);
      }

      if (message) {
        GoogleHome.notify(message);
      }
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
  console.log('started');
}).catch(console.log);

process.on('unhandledRejection', console.dir);
