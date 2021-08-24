const express = require('express');
const router = express.Router();
const tournament = require('../service/tournamentService');
const constant = require('../utils/constant');
const customResponse = require('../utils/custom-response');


router.get('/round/:tId/:rId', async (req, res) => {
  await tournament.getTournamentRound(req.params)
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Fetched Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});

router.get('/tournament/:id', async (req, res) => {
  await Match.tournament(req.params.id)
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Fetched Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});


module.exports = router;
