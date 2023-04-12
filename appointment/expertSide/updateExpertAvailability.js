const Availability = require('../models/availability');
const expressAsyncHandler = require("express-async-handler");

const updateExpertAvailability = expressAsyncHandler (async (req, res, next) => {
  try {
    const { availabilityId } = req.params;
    const { available_start_time, available_end_time, appointment_duration } = req.body;

    if (available_start_time) {
      req.body.available_start_time = new Date(available_start_time);
    }
    if (available_end_time) {
      req.body.available_end_time = new Date(available_end_time);
    }
    if (appointment_duration) {
      req.body.appointment_duration = appointment_duration;
    }

    const updatedAvailability = await Availability.findOneAndUpdate({ _id: availabilityId , practioner: req.practitioner._id }, req.body, {new: true} )

    res.status(200).json({
      success: true,
      data: updatedAvailability,
      message: 'Availability updated successfully!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = updateExpertAvailability;
