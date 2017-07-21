import { MyTwitterPage } from './app.po';

describe('my-twitter App', () => {
  let page: MyTwitterPage;

  beforeEach(() => {
    page = new MyTwitterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
