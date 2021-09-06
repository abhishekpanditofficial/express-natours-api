const express= require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID, checkBody } = require('../controllers/tourController');
const router= express.Router();



// param-middleware
// router.param('id', checkID);

// middleware-chaining
router.route('/')
          .get(getAllTours)
          .post(checkBody,createTour);

router.route('/:id')
          .get(getTour)
          .patch(updateTour)
          .delete(deleteTour);

module.exports = router;