import { WebDriver, By, Key, WebElement } from 'selenium-webdriver';
import { Config } from '../config';

export type AttendanceTime = {
  startedTime: string;
  endedTime: string;
};

export class KingOfTime {
  driver: WebDriver;
  config: Config;

  constructor(driver: WebDriver, config: Config) {
    this.driver = driver;
    this.config = config;
  }

  public async signIn() {
    await this.driver.get('https://s3.kingtime.jp/admin/');
    await this.driver
      .findElement(By.name('login_id'))
      .sendKeys(this.config.loginId);
    await this.driver
      .findElement(By.name('login_password'))
      .sendKeys(this.config.loginPassword, Key.ENTER);

    await this.driver.sleep(5000);
  }

  public async retrieveAttendanceTime(
    targetDay: Date
  ): Promise<AttendanceTime> {
    const targetDayRow = await this.findTargetDayRow(targetDay);

    const startedTime = await this.retrieveStartedTime(targetDayRow);
    const endedTime = await this.retrieveEndedTime(targetDayRow);
    return {
      startedTime,
      endedTime,
    };
  }

  private async findTargetDayRow(targetDay: Date) {
    const yyyyMMdd = `${targetDay.getFullYear()}${(
      '00' + (targetDay.getMonth() + 1).toString()
    ).slice(-2)}${('00' + targetDay.getDate().toString()).slice(-2)}`;

    const thisMonthWorkingDays = await this.driver.findElements(
      By.name('working_date')
    );

    const targetDayRowPosition = (
      await Promise.all(
        thisMonthWorkingDays.map(async (day) => {
          const hidden_value = await day.getAttribute('value');
          return hidden_value == yyyyMMdd ? day : undefined;
        })
      )
    ).find((result) => result !== undefined);

    // find tr tag from tr inside hidden_value.
    if (!targetDayRowPosition) {
      throw new Error('can not find target day information.');
    }
    const targetDayRow = await targetDayRowPosition.findElement(
      By.xpath('../../../..')
    );

    return targetDayRow;
  }

  private async retrieveStartedTime(targetDayRow: WebElement) {
    const startTimeElement = (await targetDayRow.findElements(By.css('td')))[6];
    return await startTimeElement.getText();
  }

  private async retrieveEndedTime(targetDayRow: WebElement) {
    const startTimeElement = (await targetDayRow.findElements(By.css('td')))[7];
    return await startTimeElement.getText();
  }
}
