const express = require('express');
const router = express.Router();

const constant = require('../utils/constant');
const Fantasy = require('../service/fantasyService');
const customResponse = require('../utils/custom-response');

router.get('/fan/:id', async (req, res) => {
  await Fantasy.getFantasyData(req.params.id)
    .then((data) => {
      res.status(constant.HTTP_STATUS_CODE.SUCCESS).json(customResponse.response('User Created Successfully', data));
    })
    .catch((error) => {
      res.status(error.status || constant.HTTP_STATUS_CODE.INTERNAL_ERROR).send(error);
    });
});


module.exports = router;
