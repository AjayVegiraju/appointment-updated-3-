const expressAsyncHandler = require('express-async-handler');
const Availability = require('../models/availability');

const setExpertAvailability = expressAsyncHandler(async (req, res, next) => {
  try {
    const { practitionerId } = req.params;
    const { available_start_time, available_end_time, appointment_duration } = req.body;


    const availability = new Availability({
      practitioner: practitionerId,
      available_start_time: new Date(available_start_time),
      available_end_time: new Date(available_end_time),
      appointment_duration
    });

    const savedAvailability = await availability.save();

    return res.status(200).json({
      success: true,
      data: savedAvailability,
      message: 'Availability created successfully!',
    });

  } catch (error) {
    next(error);
  }
});

module.exports = setExpertAvailability;