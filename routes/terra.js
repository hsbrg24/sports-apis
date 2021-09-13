const express = require('express');
const router = express.Router();
const constant = require('../utils/constant');
const customResponse = require('../utils/custom-response');

const terraMoney = require('../service/terra-money');



router.get('/getCoinInfo', async (req, res) => {
  await terraMoney.getCoin()
    .then((data) => {
        console.log("data", data);
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Fetched Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});


module.exports = router;
