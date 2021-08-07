const express = require('express');
const router = express.Router();

const constant = require('../utils/constant');
const Users = require('../service/userService');
const customResponse = require('../utils/custom-response');
/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.post('/onboard', async (req, res) => {
  await Users.createUser(req.body.WalletId)
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
})



module.exports = router;
