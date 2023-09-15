export interface AppPipelineEnvironmentVariables {
  [key: string]: string;
  GATSBY_MAILFWD_URL: string;
  GATSBY_CAPTCHA_VALIDATION_API_URL: string;
  GATSBY_CAPTCHA_SITE_KEY: string;
  GATSBY_CAPTCHA_SECRET_KEY: string;
  GTM_ID: string;
  certificateArn: string;
  accountId: string;
  hostedZoneId: string;
  region: string;
}
