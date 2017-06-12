/**
 * Created by talgvili on 29/12/2016.
 */
import { browser, by, element } from 'protractor';


describe('user-view', () => {

    beforeEach(() => {
        // change hash depending on router LocationStrategy
        browser.get('/#/user-display');
    });


    fit('should have a be able to add user', (done) => {
        element.all(by.css('.user-item')).count().then(originalUserCount => {
            let exptedCount = originalUserCount + 1;
            element(by.css('#nameinput')).sendKeys('Tal');
            element(by.css('#idinput')).sendKeys('123');
            element(by.css('#userformSubmit')).click();
            let output = element.all(by.css('.user-item')).count()
            browser.explore()
            expect(output).toEqual(exptedCount);
            done()
        });
    });
});
