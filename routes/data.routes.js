const {Router} = require('express');
const Data = require('../models/Data');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/list', auth, async(request, response) => {
  Data
      .find(
          request.body ? {owner: request.body.owner} : {}
      )
      .then((v) => {
        response.json(v);
      })
      .catch((e) => {
        response.status(500).json({
          message: e
        });
      });
});

module.exports = router;
