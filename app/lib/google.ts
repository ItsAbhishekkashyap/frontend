// /lib/google.ts

const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

const options = {
  redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  access_type: 'offline',
  response_type: 'code',
  prompt: 'consent',
  scope: [
    'openid',
    'email',
    'profile',
  ].join(' '),
};

const params = new URLSearchParams(options);

export const googleOAuthURL = `${rootUrl}?${params.toString()}`;
