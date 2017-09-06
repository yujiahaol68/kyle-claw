const puppeteer = require('puppeteer');

const pageNum = 0;
const pageItem = 20;
const pageUrl = `https://www.quiz-zone.co.uk/questionsbycategory/Art%20and%20Literature/0/answers.html`;

const questionSelector = 'td';
const numBarSelector = 'th';

exports.getQnAPage = async (req, res, next) => {

}

async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    console.log('going');
    await page.goto(pageUrl);

    const total = await page.evaluate(numBar => {

    }, );

    const question = await page.evaluate(q => {
        return Array.prototype.slice.apply(document.querySelectorAll(q))
            .map($qnaItem => {
                const question = $qnaItem.querySelector('span').innerText;
                const answer = $qnaItem.querySelector('b').innerText;
                return {
                    question,
                    answer
                }
            })

    }, questionSelector);
    console.log(question);
}

run();