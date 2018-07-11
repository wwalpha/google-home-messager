require('./init')

import * as AWS from 'aws-sdk';
import gql from 'graphql-tag';

// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports').default;

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const url = aws_exports.ENDPOINT;
const region = aws_exports.REGION;
const type = AUTH_TYPE.AWS_IAM;

// If you want to use API key-based auth
const apiKey = 'xxxxxxxxx';
// If you want to use a jwtToken from Amazon Cognito identity:
const jwtToken = 'xxxxxxxx';

AWS.config.update({
  region: aws_exports.REGION,
  credentials: new AWS.Credentials({
    accessKeyId: aws_exports.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws_exports.AWS_SECRET_ACCESS_KEY
  })
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

// Set up Apollo client
const client = new AWSAppSyncClient({
  url: url,
  region: region,
  auth: {
    type: type,
    credentials: credentials,
  }
});

client.hydrated().then(function (client: any) {
  //Now run a query
  client.query({ query: query })
    .then(function logData(data: any) {
      console.log('results of query: ', data);
    })
    .catch(console.error);

  //Now subscribe to results
  const observable = client.subscribe({ query: subquery });

  const realtimeResults = function realtimeResults(data: any) {
    console.log('realtime data: ', data);
  };

  observable.subscribe({
    next: realtimeResults,
    complete: console.log,
    error: console.log,
  });
});
