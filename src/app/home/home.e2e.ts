import { browser, by, element } from 'protractor';

describe('Home', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });


  it('should have a title', async () => {

    let subject = await browser.getTitle();
    let result  =  'Angular2 & NgRedux2 & Webpack Starter assembled By Tal Gvili';
    expect(subject).toEqual(result);
  });

  it('should have counter buttons', async() => {
    // Set Up
    let incrementButton = await element(by.css('#incrementCounter')).isPresent();
    let redoButton = await element(by.css('#redoCounter')).isPresent();
    let undoButton = await element(by.css('#undoCounter')).isPresent();

    // Test
    expect(incrementButton).toBe(true);
    expect(redoButton).toBe(true);
    expect(undoButton).toBe(true);
  })
});
