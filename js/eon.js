let pubnub = new PubNub({
      publishKey: 'pub-c-ebf63174-5372-4a31-9552-ad89e5fca2ce',
      subscribeKey: 'sub-c-e0ed788c-20d1-11e8-97e5-2e7e45341bc1'
});

eon.chart({
  channels: ['crypto-chart'],
  history: true,
  flow: true,
  pubnub: pubnub,
  generate: {
    bindto: '#chart',
    data: {
      labels: false
    }
  }
});

  $.getJSON( "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=XVG,TRON,ZIL,DGB", function( json ) {
      var dateCurrent = new Date();
      var dateMilli = dateCurrent.getTime();
      
      pubnub.publish({
        channel: 'crypto-chart',
        message: 
          {"eon":{
            "XVG": json.XVG,
            "TRON": json.TRON,
            "ZIL": json.ZIL,
            "DGB": json.DGB,
            "_eonDatetime": dateMilli
            }
          }
        });
    })
  

setInterval(() => {
    $.getJSON( "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=XVG,TRON,ZIL,DGB", function( json ) {
      var dateCurrent = new Date();
      var dateMilli = dateCurrent.getTime();
      
      pubnub.publish({
        channel: 'crypto-chart',
        message: 
          {"eon":{
            "XVG": json.XVG,
            "TRON": json.TRON,
            "ZIL": json.ZIL,
            "DGB": json.DGB,
            "_eonDatetime": dateMilli
            }
          }
        });
    })
},2000)

