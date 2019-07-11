const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv')

const URL = 'https://www.cbr.ru/currency_base/daily/?date_req='

var Cbr

var f = function setCbr(cur) {
    Cbr = cur
}


var getCurrency = function(){

    const date = new Date(); 
    const DDMMYY = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

    request(URL + DDMMYY, function(error, response, body, Cbr) {

    const $ = cheerio.load(body);
    const data = $('tr');
    const USD = data.eq(11).children().eq(4).text().replace(',', '.');
    const EUR = data.eq(12).children().eq(4).text().replace(',', '.');
    const CHF = data.eq(34).children().eq(4).text().replace(',', '.');
    const GBP = data.eq(29).children().eq(4).text().replace(',', '.');

    writeStream.write('USD $  ' + USD +'\nEUR €   ' + EUR + '\nCHF ₣  ' + CHF + '\nGBP £  ' + GBP)
    console.log(fs.readFileSync('post.csv', 'utf8'))

     
    })
}

getCurrency();
