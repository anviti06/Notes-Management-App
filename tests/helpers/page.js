const puppeteer = require('puppeteer');
const session_factory = require('../factories/session_factory');
const user_factory = require('../factories/user_factory');

class CustomPage {

    static async build() {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function (target, property) {
                return target[property] || browser[property] || page[property];
            }
        });
    }

    constructor(page) {
        this.page = page;
    }

    async login() {

        const new_user = await user_factory();
        const { session, sig } = session_factory(new_user);

        await this.page.setCookie({ name: 'express:sess', value: session });
        await this.page.setCookie({ name: 'express:sess.sig', value: sig });
        await this.page.goto('http://localhost:3000/folder_list');

        await this.page.waitFor('a[href="/auth/logout"]');
    }

    async getContentsOf(selector) {
        return await this.page.$eval(selector, (el) => el.innerHTML);
    }

    async post(path, content) {
        const response = await this.page.evaluate(async (_path, _content) => {
            let result = await fetch(_path, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_content)
            });
            return Promise.resolve(result.json());
        }, path, content);

        return response;
    }

    async get(path) {
        const response = await this.page.evaluate(async (_path) => {
            let result = await fetch(_path, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(result.json());
        }, path);

        return response;
    }
}

module.exports = CustomPage;