const expressAsyncHandler = require('express-async-handler');
const Availability = require('../models/availability');
const Appointment = require('../models/appointment');

const getBookedAppointments = expressAsyncHandler(async (req, res, next) => {
  try {
    const { practitionerId } = req.params;

    const availability = await Availability.findOne({ practitioner: practitionerId });
    
    const bookedAppointments = await Appointment.find({
      practitioner: practitionerId,
      start_time: { $gte: availability.available_start_time },
      end_time: { $lte: availability.available_end_time },
    }).populate('user', 'name email');

    return res.status(200).json({
      success: true,
      data: bookedAppointments,
      message: 'Booked appointments retrieved successfully!',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = getBookedAppointments;