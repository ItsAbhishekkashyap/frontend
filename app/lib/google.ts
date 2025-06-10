const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const options = {
  redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
  client_id:    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  access_type:  'offline' as const,
  response_type:'code' as const,
  prompt:       'consent' as const,
  scope: [
    'openid',
    'email',
    'profile',
  ].join(' '),
};
const params = new URLSearchParams(options);
export const googleOAuthURL = `${rootUrl}?${params.toString()}`;
