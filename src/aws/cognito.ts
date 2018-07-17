import { Auth } from 'aws-amplify';
import { CognitoIdentityCredentials } from 'aws-sdk';
import { CognitoUser } from 'amazon-cognito-identity-js';

/** 認証情報を取得する */
// const auth = (username: string, password: string): Promise<void> => new Promise((resolve, reject) => {
//   const { UserPoolId, IdentityPoolId, UserPoolWebClientId } = Config.Cognito;

//   const authenticationDetails = new AuthenticationDetails({
//     Username: username,
//     Password: password,
//   });

//   const userPool = new CognitoUserPool({
//     ClientId: UserPoolWebClientId,
//     UserPoolId,
//   });

//   const cognitoUser = new CognitoUser({
//     Username: username,
//     Pool: userPool,
//   });

//   cognitoUser.authenticateUser(authenticationDetails, {
//     onSuccess: (session: CognitoUserSession) => {
//       const accessToken = session.getAccessToken().getJwtToken();
//       const idToken = session.getIdToken().getJwtToken();

//       const pool: string = `cognito-idp.${Config.Region}.amazonaws.com/${UserPoolId}`;
//       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//         IdentityPoolId,
//         Logins: {
//           // Change the key below according to the specific region your user pool is in.
//           [pool]: idToken,
//         },
//       });

//       AWS.config.region = Config.Region;
//       AWS.config.update({
//         region: Config.Region,
//         accessKeyId: Config.AccessKeyId,
//         secretAccessKey: Config.SecretAccessKey,
//       });
//       (AWS.config.credentials as AWS.Credentials).refresh((err: AWS.AWSError) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     },
//     onFailure: (err: any) => reject(err),
//   });
// });

/**
 * ユーザー存在する場合、ユーザー情報を取得する
 * ユーザー存在しない場合、ユーザーを登録してからユーザー情報を取得する
 */
export const login = async (username: string, password: string) => {
  let user: CognitoUser;
  try {
    user = await Auth.signIn(username, password);
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      console.log(error);
    }
    user = await Auth.signUp({ username, password });
  }

  const credentials: CognitoIdentityCredentials = await Auth.currentUserCredentials();

  return { user, credentials };
};
