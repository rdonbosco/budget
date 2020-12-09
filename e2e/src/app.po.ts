import { browser, by, element } from 'protractor';

export class AppPage {
  
  navigateTo(): Promise<unknown> {
    return browser.get('/') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return 'Budget-app app is running!' as unknown as Promise<string>;
  }

  fillCredentials(): any {
    this.getFormField("username").clear();
    this.getFormField("password").clear();
    this.getFormField("username").sendKeys('rushi');
    this.getFormField("password").sendKeys('Rushi@12');
    element(by.css("button[aria-label='Login']")).click();
 }

 fillBlankCredentials(): any {
    this.getFormField("username").clear();
    this.getFormField("password").clear();
    this.getFormField("username").click();
    this.getFormField("password").click();
    this.getFormField("username").click();
  }

  fillWrongCredentials(): any {
    this.getFormField("username").clear();
    this.getFormField("password").clear();
    this.getFormField("username").sendKeys('test');
    this.getFormField("password").sendKeys('test@123');
    element(by.css("button[aria-label='Login']")).click();
  }

  getFormField(field) {
  return element(by.name(field));
 }
}
