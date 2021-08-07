const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Match = require('../service/match');
const constant = require('../utils/constant')
const customResponse = require('../utils/custom-response');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/service', (req, res) => {
  fetch("https://api-basketball.p.rapidapi.com/timezone", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-basketball.p.rapidapi.com"
    }
  })
    .then(response => {
      console.log(response);
      // Promise.resolve(response)
      res.json(response);
    })
    .catch(err => {
      console.error(err);
    });

});

router.post('/postMatchData', async (req, res) => {
  await Match.creatMatchData(req.body)
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Created Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
})

router.get('/getallData', async (req, res) => {
  await Match.getMatchData()
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Retrived Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});

module.exports = router;
