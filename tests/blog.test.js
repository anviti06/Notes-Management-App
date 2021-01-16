const Page = require('./helpers/page');
let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

describe('When logged in', async () => {
    beforeEach(async () => {
        await page.login();
        await page.goto('http://localhost:3000/notes/testing')
        await page.click('a.btn-floating');
    });
    test('testing if note form appears', async () => {
        const text = await page.getContentsOf('form label');
        console.log('form content=', text);
        expect(text).toEqual('Blog Title');
    });

    describe('and entered valid form inputs', async () => {
        beforeEach(async () => {
            await page.type('.title input', 'this is a title');
            await page.type('.content input', 'this is a content');
            await page.click('form button');
        });

        test('check if confirmation form appears after submitting form', async () => {
            const text3 = await page.getContentsOf('h5');
            console.log('text3=', text3);
            expect(text3).toEqual('Please confirm your entries');
        });

        test('check if note is added after submitting form', async () => {
            await page.click('.green.btn-flat');
            await page.waitFor(5000);
            await page.waitFor('.card');

            const title = await page.getContentsOf('.card-title');
            const content = await page.getContentsOf('p');

            console.log('title=', title);
            console.log('content=', content);

            // expect(title).toEqual('this is a title');
            expect(content).toEqual('this is a content');
        })
    })

    describe('and entered invalid content in form', async () => {
        beforeEach(async () => {
            await page.click('form button');
        });

        test('check if error message occur', async () => {
            const text1 = await page.getContentsOf('.title .red-text');
            const text2 = await page.getContentsOf('.content .red-text');

            console.log("text1=", text1);
            console.log("text2=", text2);

            expect(text1).toEqual('You must provide a value');
            expect(text2).toEqual('You must provide a value');
        })
    })

});

test('check the response of api request when not logged in', async () => {
    // await page.login();
    const response = await page.post('/api/add_folder', { folder_name: 'testingFolder' });
    console.log('response=', response);
    expect(response).toEqual({ error: 'You must log in!' });
});


test('check if blogs posts appears when not logged in', async () => {
    // await page.login();
    const response = await page.get('/api/fetch_folder_list');
    console.log('response=', response);
    expect(response).toEqual({ error: 'You must log in!' });
});