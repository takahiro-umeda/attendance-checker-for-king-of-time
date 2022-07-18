import { IncomingWebhook } from '@slack/webhook';
import { Config } from '../config';
import { AttendanceTime } from '../king-of-time';

export const notifier = (config: Config) => {
  const webhook = new IncomingWebhook(config.slackIncomingWebHookUrl);

  const elapsedOpeningHour = (currentDay: Date) => {
    const openingHour = new Date(currentDay);
    openingHour.setHours(config.OpeningHour, 0, 0);
    console.log('openingHour=', openingHour);
    return currentDay > openingHour;
  };

  const elapsedClosingHour = (currentDay: Date) => {
    const closingHour = new Date(currentDay);
    closingHour.setHours(config.ClosingHour, 0, 0);
    console.log('closingHour=', closingHour);
    return currentDay > closingHour;
  };

  return {
    call: async (attendanceTimeOfTheDay: AttendanceTime, currentDay: Date) => {
      console.log('currentDay=', currentDay);

      console.log(
        'startedTime is',
        attendanceTimeOfTheDay.startedTime || 'unregistered'
      );
      console.log(
        'endedTime is',
        attendanceTimeOfTheDay.endedTime || 'unregistered'
      );

      if (
        !attendanceTimeOfTheDay.startedTime &&
        elapsedOpeningHour(currentDay)
      ) {
        await webhook.send(`本日の出勤打刻を忘れていませんか？`);
        console.log('Send message to Slack about unregistered startedTime.');
      }

      if (!attendanceTimeOfTheDay.endedTime && elapsedClosingHour(currentDay)) {
        await webhook.send(`本日の退勤打刻を忘れていませんか？`);
        console.log('Send message to Slack about unregistered endedTime.');
      }
    },
  };
};
