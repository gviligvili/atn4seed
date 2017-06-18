import { browser, by, element } from 'protractor';


describe('user-display Smart', () => {

    beforeEach(() => {
        // change hash depending on router LocationStrategy
        browser.get('/#/user-display');
});


    it('should have a users-view directive', async () => {
        let userViewCount = await element.all(by.css('users-view')).count();

        expect(userViewCount).toEqual(1);
    });
});
