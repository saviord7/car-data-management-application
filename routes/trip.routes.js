const {Router} = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async(req, res) => {
  try {
    const {name} = req.body;

    const existing = await Trip.findOne({name});

    if (existing) {
      return res.json({
        trip: existing
      });
    }

    const trip = new Trip({
      name,
      owner: req.user.userId
    });

    await trip.save();

    res.status(201).json({
      trip
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again'
    });
  }
});

router.post('/list', auth, async(request, response) => {
  Trip
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
