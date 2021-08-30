const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Match = require('../service/tournamentService');
const constant = require('../utils/constant');
const customResponse = require('../utils/custom-response');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/tournament', async (req, res) => {
  await Match.recentTournament()
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Fetched Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});

router.get('/gettournament/:id', async (req, res) => {
  await Match.tournament(req.params.id)
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Fetched Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
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

router.get('/getMatchLineUp', async (req, res) => {
  await Match.getMatchLineUp()
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Retrived Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});

router.get('/getAllSavedMatchesIds', async (req, res) => {
  await Match.getAllSavedMatches()
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Retrived Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});

router.get('/getAllSavedTournamentsIds', async (req, res) => {
  await Match.getSavedTournaments()
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('Data Retrived Successfully', data));
    })
    .catch((error) => {
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});


module.exports = router;
