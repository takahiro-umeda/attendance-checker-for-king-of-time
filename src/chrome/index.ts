import { Builder, Browser } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

export const buildDriver = () => {
  const chromeOptions: Options = new Options();
  chromeOptions.headless();
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.addArguments('--lang=ja-JP');

  return new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromeOptions)
    .build();
};
