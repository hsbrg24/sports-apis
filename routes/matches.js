const express = require('express');
const router = express.Router();

const constant = require('../utils/constant');
const MatchService = require('../service/matchService');
const customResponse = require('../utils/custom-response');
const { getSavedMatchesFromDB } = require('../service/tournamentService');

router.get('/getMatch/:id', async (req, res) => {
  await MatchService.getMatchData(req.params.id)
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('User Created Successfully', data));
    })
    .catch((error) => {
      // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});


router.get('/getAllUsers', async (req, res) => {
  await Users.getAllUsers()
  .then((data) => {
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('All Users', data));
  })
  .catch((error) => {
    // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
    res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
  });
});

router.get('/getTeamData/:tId/:teamId', async (req, res) => {
  await MatchService.getTeamData(req.params.tId, req.params.teamId)
  .then((data) => {
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('All Users', data));
  })
  .catch((error) => {
    // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
    res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
  });
});

router.get('/getPlayerData/:tId/:pId', async (req, res) => {
  await MatchService.getPlayerData(req.params.tId, req.params.tId)
  .then((data) => {
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('All Users', data));
  })
  .catch((error) => {
    // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
    res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
  });
});

router.get('/todaysmatches/:date?', async (req, res) => {
  await MatchService.getTodaysMatches(req.params)
  .then((data) => {
    if(data.length > 0)
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('All Matches', data[0]));
    else
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('No Upcoming matches found, please fetch new Data!'));
  })
  .catch((error) => {
    // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
    res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
  });
});

router.get('/getMatchesByIDs/:tId/:rId', async (req, res) => {
  await getSavedMatchesFromDB(req.params)
  .then((data) => {
    if(data.length > 0)
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('All Matches', data));
    else
    res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('No Upcoming matches found, please fetch new Data!'));
  })
  .catch((error) => {
    // winstonLogging.error(`${error.status || 500} - ${error.message} - ${req.originalUrl}`);
    res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
  });
});





module.exports = router;
