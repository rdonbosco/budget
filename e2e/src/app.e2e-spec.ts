import { AppPage } from './app.po';
import { browser, logging, protractor, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Budget-app app is running!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it("when username and password are required — show error", () => {
    page.fillBlankCredentials();

    browser.driver.sleep(5000);
    browser.waitForAngular();
  });

  it("when login is fail — show error", () => {
    page.fillWrongCredentials();

    browser.driver.sleep(5000);
    browser.waitForAngular();
  });

  it("when login is successful — redirect to home", () => {
    page.fillCredentials();

    browser.driver.sleep(5000);
    browser.waitForAngular();
  });
});
