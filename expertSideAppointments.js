const router = require('express').Router();
const { checkAuth } = require('../middlewares/verifyToken');
const {
  getAllAppointments,
  getBookedAppointments,
  setExpertAvailability,
  updateExpertAvailability,
} = require('../controllers/appointment/expertSide');

router.get('/:practitionerId', checkAuth, getAllAppointments);
router.get('/booked/:practitionerId', checkAuth, getBookedAppointments);
router.post('/availability/:practitionerId', checkAuth, setExpertAvailability);
router.patch('/availability/:practitionerId', checkAuth, updateExpertAvailability);

module.exports = router;