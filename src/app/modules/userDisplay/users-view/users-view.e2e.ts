/**
 * Created by talgvili on 29/12/2016.
 */
import {browser, by, element} from 'protractor';


describe('user-view', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/user-display');
  });


  it('should have a be able to add user', async (done) => {
    let originalUserCount = await element.all(by.css('.user-item')).count()

    let exptedCount = originalUserCount + 1;
    await element(by.css('#nameinput')).sendKeys('Tal');
    await element(by.css('#idinput')).sendKeys('123');
    await element(by.css('#userformSubmit')).click();
    let output = await element.all(by.css('.user-item')).count()
    // browser.explore()
    expect(output).toEqual(exptedCount);
    done()
  });
})
;
