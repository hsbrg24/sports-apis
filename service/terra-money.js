const { LCDClient, Coin } = require('@terra-money/terra.js');


const terraMoney = {

  async getCoin() {

    try {

      // connect to bombay testnet
      const terra = new LCDClient({
        URL: 'https://bombay-lcd.terra.dev',
        chainID: 'bombay-10',
      });

      // To use LocalTerra
      // const terra = new LCDClient({
      //   URL: 'http://localhost:1317',
      //   chainID: 'localterra'
      // });

      // get the current swap rate from 1 TerraUSD to TerraKRW
      const offerCoin = new Coin('uusd', '1000000');
      terra.market.swapRate(offerCoin, 'ukrw').then(c => {
        const value = `${offerCoin.toString()} can be swapped for ${c.toString()}`;
        console.log(value);
        return Promise.resolve({value});
      });
    } catch (error) {
      return Promise.reject(res.error(constant.HTTP_STATUS_CODE.INVALID_DATA, error.message));

    }


  },
};

module.exports = terraMoney;