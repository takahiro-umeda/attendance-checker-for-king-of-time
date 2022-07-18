import * as ChromeDriver from './chrome';
import { notifier } from './slack';
import { retrieveConfig } from './config';
import { KingOfTime } from './king-of-time';

(async function main() {
  const config = retrieveConfig();

  const driver = await ChromeDriver.buildDriver();

  try {
    const currentDay = new Date();

    const kingOfTime = new KingOfTime(driver, config);

    await kingOfTime.signIn();
    const attendanceTime = await kingOfTime.retrieveAttendanceTime(currentDay);

    await notifier(config).call(attendanceTime, currentDay);
  } finally {
    await driver.quit();
  }
})();
