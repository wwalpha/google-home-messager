export type Cognito = {
  UserPoolId: string;
  UserPoolWebClientId: string;
  IdentityPoolId: string;
};

const region: string = 'ap-northeast-1';
const S3_URL: string = `https://s3-${region}.amazonaws.com`;
const bucket: string = 'iot-home-chat';
const cognito: Cognito = {
  UserPoolId: 'ap-northeast-1_DlXJc0xUN',
  UserPoolWebClientId: '1vmq0hpdu9j9khkiq6l6adpvl2',
  IdentityPoolId: 'ap-northeast-1:00cc4b25-0d8e-4b64-a15f-ecb62f3d26f3',
};

export default {
  Region: region,
  S3_URL,
  Bucket: bucket,
  Cognito: cognito,
};
