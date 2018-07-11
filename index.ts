require('./init');

import * as AWS from 'aws-sdk';
import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';
import * as home from 'src/googlehome';
import Config from './aws-exports';

home.ip('172.16.80.3', 'ja');

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;

const url = Config.ENDPOINT;
const region = Config.REGION;
const type = AUTH_TYPE.AWS_IAM;

// If you want to use API key-based auth
const apiKey = 'xxxxxxxxx';
// If you want to use a jwtToken from Amazon Cognito identity:
const jwtToken = 'xxxxxxxx';

AWS.config.update({
  region: Config.REGION,
  credentials: new AWS.Credentials({
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  }),
});
const credentials = AWS.config.credentials;

// Import gql helper and craft a GraphQL query
const query = gql(`
query AllPosts {
allPost {
    __typename
    id
    title
    content
    author
    version
}
}`);

import * as AppSync from 'src/appsync';
import { SubscriptionOptions } from 'apollo-client';

AppSync.config({
  url: Config.ENDPOINT,
  region: Config.REGION,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
  },
});

// Set up a subscription query
const subquery = gql(`
subscription NewPostSub {
  newPost {
    __typename
    id
    title
    author
    version
  }
}`);

const subscription: SubscriptionOptions = {
  query: subquery,
};

AppSync.subscribe(query, (value: any) => {
  console.log(value);
});
