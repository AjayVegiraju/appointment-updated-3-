const router = require('express').Router();
const { checkAuth } = require('../middlewares/verifyToken');
const {
  createApt,
  getApt,
  getAvailableTimeSlots,
  updateApt,
} = require('../controllers/appointment/userSide');

router.post('/', checkAuth, createApt);
router.get('/:userId', checkAuth, getApt);
router.get('/available/:practitionerId', checkAuth, getAvailableTimeSlots);
router.patch('/:appointmentId', checkAuth, updateApt);

module.exports = router;