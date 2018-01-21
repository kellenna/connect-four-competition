import { ConnectFourPage } from './app.po';

describe('connect-four App', () => {
  let page: ConnectFourPage;

  beforeEach(() => {
    page = new ConnectFourPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
