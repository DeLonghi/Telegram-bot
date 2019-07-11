function invoiceSber(amount_) {
     return {
    provider_token : '401643678:TEST:00c12adb-4c77-4bc7-9449-08410dd73c0f',
    start_parameter : 'donation',
    title : 'Donation to Ilya Vinnikov',
    description : '💰💰💰💰💰💰💰💰',
    currency : 'rub',
    prices : [
      { label: 'donation', amount: amount_ },      
    ],
    payload : {
      
    }
   };
  }

  function invoiceYandex(amount_) {
    return {
   provider_token : '381764678:TEST:10371',
   start_parameter : 'donation',
   title : 'Donation to Ilya Vinnikov',
   description : '💰💰💰💰💰💰💰💰',
   currency : 'rub',
   prices : [
     { label: 'donation', amount: amount_ },      
   ],
   payload : {
    
   }
  };
 }
  


  module.exports = {
    invoiceSber : invoiceSber,
    invoiceYandex : invoiceYandex,

};
