const Markup = require('telegraf/markup')


const donate = Markup.inlineKeyboard([
    Markup.callbackButton("Donate", "donate")
  ]).extra();
  
const howMuch = Markup.inlineKeyboard ([
    Markup.callbackButton("100₽", "100"),
    Markup.callbackButton("500₽", "500"),
    Markup.callbackButton("1000₽", "1000"),
    Markup.callbackButton("<< Back", "back"),
  ], { columns : 1}).extra();

 
function provider(donation_sum) {
    return Markup.inlineKeyboard ([
       Markup.callbackButton("Сбербанк", "сбер" + donation_sum),
       Markup.callbackButton("Яндекс.Касса", 'яндекс' + donation_sum),
       Markup.callbackButton("<< Back", "back_to_howMuch"),
     ], { columns : 1}).extra();
   
   }


const replyOptions = Markup.inlineKeyboard([
    Markup.payButton('💲'),
    Markup.callbackButton('🗑️', 'delete'),
  ]).extra();



  module.exports = {
    donate : donate,
    howMuch : howMuch,
    provider : provider,
    replyOptions : replyOptions,
};
