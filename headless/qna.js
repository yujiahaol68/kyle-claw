const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');

let pageNum = 0;
const pageItem = 20;
const pageUrl = `https://www.quiz-zone.co.uk/questionsbycategory/Art%20and%20Literature/0/answers.html`;

const questionSelector = 'td';
const numBarSelector = 'th';

const dataFilePath = '../storage/data/';

async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    const category = ['Art and Literature', 'General Knowledge', 'Geography', 'History', 'Music', 'Science and Nature', 'Sport', 'Tie Break'];
    for(let i=0;i < category.length;i++) {
        pageNum = 0;
        const pageUrl = `https://www.quiz-zone.co.uk/questionsbycategory/${category[i]}/${pageNum}/answers.html`;
        await page.goto(pageUrl);
    
        const total = await page.evaluate(numBar => {
            return document.querySelector(numBar).innerText;
        }, numBarSelector);
        console.log(total);
    
        const totalItems = parseInt(matchTotalItems(total)[0]);
        console.log(totalItems);
    
        const dataPath = dataFilePath + category[i] + '.yml';
    
        initDataFile(dataPath, category[i]);
    
        while(pageNum<=totalItems-pageItem) {
            await page.goto(pageUrl);
            const qna = await getQnaArray(page, questionSelector);
            //console.log(qna);
            writeQnaToFile(dataPath, qna);
            pageNum+=pageItem;
        }
    }

}

function matchTotalItems(val) {
    const reg = new RegExp(/(\d+)(?!.*\d)/);
    return reg.exec(val);
}

async function getQnaArray(page, selector) {
    return await page.evaluate(q => {
        return Array.prototype.slice.apply(document.querySelectorAll(q))
            .map($qnaItem => {
                const question = $qnaItem.querySelector('span').innerText;
                const answer = $qnaItem.querySelector('b').innerText;
                return {
                    question,
                    answer
                }
            })

    }, selector);
}

function initDataFile(filePath, category) {
    fs.appendFileSync(filePath, `categories:\n- ${category}\nconversations:\n`);
}

function writeQnaToFile(filePath, nQuestion) {
    _.forEach(nQuestion, (item) => {
        fs.appendFileSync(filePath, `- - ${item.question}\n  - ${item.answer}\n`);
    });
}

run();