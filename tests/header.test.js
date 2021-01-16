const Page = require('./helpers/page');
let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000");
});

afterEach(async () => {
    await page.close();
})

test("testing text present in header", async () => {
    const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);
    expect(text).toEqual('MyNoteApp');
});

test("testing OAuth flow while clicking login", async () => {
    var url = await page.url();

    await page.click('.right a');
    url = await page.url();
    console.log("url after login clicked", url);
    expect(url).toMatch(/accounts\.google\.com/);
});

test("shows logout after logged in", async () => {
    await page.login();
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
    console.log("text=", text);

});

