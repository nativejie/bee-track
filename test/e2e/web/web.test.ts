import { IHttpReportData, HttpType } from '@bee/track-shared';
import puppeteer from 'puppeteer';

const TEST_SERVER_PORT = 5500;
const WEB_URL = `http://localhost:${TEST_SERVER_PORT}/web/index.html`;

describe('Web e2e', () => {
  const timeout = 3000;
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;
  const finishedRequestHandles = [];

  const getGlobal = async () => {
    return await page.evaluate(() => {
      return window['TRACK'];
    });
  };

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(WEB_URL);
    page.on('requestfinished', (request) => {
      if (finishedRequestHandles.length > 0) {
        finishedRequestHandles.shift()(request);
      }
    });
  });

  afterEach(async () => {
    await browser.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('SDK加载成功：', async () => {
    expect(await getGlobal()).toBeDefined();
  });

  it('发送XHR请求：', async () => {
    const finishedRequestHandle = async (
      httpRequest: puppeteer.HTTPRequest,
    ) => {
      const { response, request } = JSON.parse(
        httpRequest.postData(),
      ) as IHttpReportData;
      expect(request.httpType).toBe(HttpType.XHR);
      expect(request.url).toBeDefined();
      expect(response.status).toBeDefined();
    };
    finishedRequestHandles.push(finishedRequestHandle);
    await page.click('#sendNormalXHR');
  });
});
