require('./init');

import gql from 'graphql-tag';
import { SubscriptionOptions } from 'apollo-client';
import * as AppSync from './src/appsync';
import * as home from './src/googlehome';
import Config from './aws-exports';

home.ip('172.16.80.3', 'ja');

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
console.log(111);
AppSync.config({
  url: Config.aws_appsync_graphqlEndpoint,
  region: Config.aws_project_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: () => Config.aws_appsync_apiKey,
  },
});

// Set up a subscription query
const subquery = gql(`
subscription AddMessage {
  subscribeToAddMessage {
    id
    signedURL
  }
}`);

const subscription: SubscriptionOptions = {
  query: subquery,
};

console.log(222);
AppSync.subscribe(subscription, (value: any) => {
  console.log(value);
});
