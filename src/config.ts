export type Config = {
  loginId: string;
  loginPassword: string;
  slackIncomingWebHookUrl: string;
  OpeningHour: number;
  ClosingHour: number;
};

const loginId = () => process.env['KING_OF_TIME_LOGIN_ID'] || '';

const loginPassword = () => process.env['KING_OF_TIME_LOGIN_PASSWORD'] || '';

const slackIncomingWebHookUrl = () =>
  process.env['SLACK_INCOMING_WEB_HOOK_URL'] || '';

const openingHour = () => Number.parseInt(process.env['OPENING_HOUR'] || '');

const closingHour = () => Number.parseInt(process.env['CLOSING_HOUR'] || '');

const validate = (): void => {
  const configKeys = [
    'KING_OF_TIME_LOGIN_ID',
    'KING_OF_TIME_LOGIN_PASSWORD',
    'SLACK_INCOMING_WEB_HOOK_URL',
    'OPENING_HOUR',
    'CLOSING_HOUR',
  ];
  configKeys.forEach((configKey) => {
    if (!process.env[configKey]) {
      throw new Error(`${configKey} is not set as environment variables.`);
    }
  });

  if (Number.isNaN(openingHour()) || Number.isNaN(closingHour())) {
    throw new Error(
      `OpeningHour and ClosingHour must be set, between 0 and 24.`
    );
  }
};

export const retrieveConfig = (): Config => {
  validate();

  return {
    loginId: loginId(),
    loginPassword: loginPassword(),
    slackIncomingWebHookUrl: slackIncomingWebHookUrl(),
    OpeningHour: openingHour(),
    ClosingHour: closingHour(),
  };
};
