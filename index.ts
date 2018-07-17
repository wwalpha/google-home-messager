require('./init');

import Config from './aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-northeast-1',
  credentials: new AWS.Credentials({
  }),
});

const credentials = AWS.config.credentials;

const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;

const username: string = 'test11';
const password: string = 'Test1234567890';

const auth = {
  type: AUTH_TYPE.AWS_IAM,
  credentials,
};

console.log(auth);

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: Config.aws_appsync_graphqlEndpoint,
  region: Config.aws_project_region,
  auth,
});

// const start = async () => {
//   const userInfo = await Cognito.login(username, password);
//   const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
//   const credentials = await Auth.currentCredentials();

//   // console.log(Auth.currentCredentials());

//   const client = new AWSAppSyncClient({
//     disableOffline: true,
//     url: Config.aws_appsync_graphqlEndpoint,
//     region: Config.aws_project_region,
//     auth: {
//       type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
//       credentials,
//       jwtToken,
//     },
//   });

client.hydrated().then((client) => {
  console.log(2222222222222222222222222);
  const subquery = gql(`
    subscription SubscribeToRecvMessage {
      subscribeToRecvMessage {
        signedURL
      }
    }`);

  // Now subscribe to results
  const observable = client.subscribe({ query: subquery });
  console.log(33333);
  const realtimeResults = function realtimeResults(data: any) {
    console.log('realtime data: ', data);
  };

  observable.subscribe({
    next: realtimeResults,
    complete: console.log,
    error: console.log,
  });
});
// }

// try {
//   start();
// } catch (e) {
//   console.log(e);
// }

// Cognito.login(username, password).then((user) => {
//   const SubscribeToEventComments = `subscription SubscribeToRecvMessage {
//     subscribeToRecvMessage {
//       signedURL
//     }
//   }`;

//   // Subscribe with eventId 123
//   const subscription = (API.graphql(
//     graphqlOperation(SubscribeToEventComments)
//   ) as Observable<any>).subscribe({
//     next: (eventData) => console.log(eventData.value.data.subscribeToRecvMessage.signedURL)
//   });
// });

process.on('unhandledRejection', console.dir);
