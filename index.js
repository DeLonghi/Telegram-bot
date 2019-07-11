const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Keyboards = require('./keyboards')
const payment = require('./paymentAtrributes')
const currency = require('./currency')
const request = require('request')
const cheerio = require('cheerio')
const URL = 'https://www.cbr.ru/currency_base/daily/?date_req='


var sum = 50000;

//console.log(currency.getCurrency())

var sberAction = function (text) {
sum = text.match(/[0-9]{1,}/)[0] * 100;
console.log(text);
return '/сбер[0-9]{1,}/'
}

var yandexAction = function (text) {
  sum = text.match(/[0-9]{1,}/)[0] * 100;
  console.log(text);
  return '/яндекс[0-9]{1,}/'
  }


const bot = new Telegraf("892150392:AAEzXN3YL2VngGD8dvwWfZ0xumQ8HEL1VDI")


bot.start((ctx) => ctx.reply("Thanks for your support", Keyboards.donate))


bot.hears(/\/currency/, (ctx) => { 
  const date = new Date(); 
  const DDMMYY = date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
  console.log(URL+DDMMYY)

  request(URL + DDMMYY, function(error, response, body) {
    
    const $ = cheerio.load(body);
    const data = $('tr');
    const USD = data.eq(11).children().eq(4).text().replace(',', '.');
    const EUR = data.eq(12).children().eq(4).text().replace(',', '.');
    const CHF = data.eq(34).children().eq(4).text().replace(',', '.');
    const GBP = data.eq(29).children().eq(4).text().replace(',', '.');

    const Cbr = ' *Курсы ЦБ РФ*. \n\nДействуют с ' + DDMMYY + '\n\n`usd $   ' + USD +'`\n`eur €   ' + EUR + '`\n`chf ₣   ' + CHF + '`\n`gbp £   ' + GBP + '`';
    ctx.replyWithMarkdown(Cbr);
     
    })})
  

bot.on('video_note', (ctx) => ctx.reply('👏'));
bot.hears('kek', () => console.log('Woohoo'));

bot.on('message', (ctx) => 
{ ctx.reply('👏');
console.log(ctx.message.text)
});


bot.action('donate', ({ editMessageText }) => 
  editMessageText("How much are you willing to donate?", Keyboards.howMuch));

bot.action('100', ({ editMessageText }) => editMessageText("Choose payment provider:", Keyboards.provider(100)));
bot.action('500', ({ editMessageText }) => editMessageText("Choose payment provider:", Keyboards.provider(500)));
bot.action('1000', ({ editMessageText }) => editMessageText("Choose payment provider:", Keyboards.provider(1000)));

bot.action('delete', ({ deleteMessage }) => deleteMessage());

bot.action('back', ({ editMessageText }) => editMessageText("Thanks for your support", Keyboards.donate));
bot.action('back_to_howMuch', ({ editMessageText }) => editMessageText("Choose payment provieder:", Keyboards.howMuch));



bot.action( /сбер[0-9]{1,}/,  ( ctx) =>  {
  sberAction(ctx.callbackQuery.data),
  ctx.replyWithInvoice(payment.invoiceSber(sum), Keyboards.replyOptions),                                                                                     
  ctx.editMessageText("Thanks for your support", Keyboards.donate)
  }
);

bot.action( /яндекс[0-9]{1,}/,  ( ctx ) =>  {
  yandexAction(ctx.callbackQuery.data)
  ctx.replyWithInvoice(payment.invoiceYandex(sum), Keyboards.replyOptions, 
  ctx.editMessageText("Thanks for your support", Keyboards.donate))
  }
); 
                                                                                                                                                          

bot.on('pre_checkout_query', ({ answerPreCheckoutQuery }) => answerPreCheckoutQuery(true));


bot.launch()