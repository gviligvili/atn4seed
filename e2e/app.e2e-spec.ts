import { ATNAngular4Page } from './app.po';

describe('atnangular4 App', () => {
  let page: ATNAngular4Page;

  beforeEach(() => {
    page = new ATNAngular4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
