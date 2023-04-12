const expressAsyncHandler = require('express-async-handler');
const Availability = require('../models/availability');
const Appointment = require('../models/appointment');

const getAllAppointments = expressAsyncHandler(async (req, res, next) => {
  try {
    const { practitionerId } = req.params;
    const availability = await Availability.findOne({ practitioner: practitionerId });

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found.' });
    }

    // Retrieve booked appointments sorted by start_time
    const bookedAppointments = await Appointment.find({
      practitioner: practitionerId,
    }).populate('user', 'name email').sort({ start_time: 1 });

    // Initialize the availableTimeSlots array
    const availableTimeSlots = [];
    // Set the currentSlotStart as the available_start_time from the availability
    let currentSlotStart = availability.available_start_time;

    // Iterate through the bookedAppointments
    bookedAppointments.forEach(appointment => {
      // Calculate the time difference between the appointment start_time and currentSlotStart
      const timeDifference = appointment.start_time.getTime() - currentSlotStart.getTime();
      // Convert the time difference to durationInMinutes
      const durationInMinutes = timeDifference / 1000 / 60;

      // If the durationInMinutes is equal to or greater than appointment_duration, add the time slot to availableTimeSlots
      if (durationInMinutes >= availability.appointment_duration) {
        availableTimeSlots.push({
          start_time: currentSlotStart,
          end_time: appointment.start_time,
        });
      }

      // Update currentSlotStart to the appointment end_time
      currentSlotStart = appointment.end_time;
    });

    // Check if there's an available time slot between the last appointment and the available_end_time
    const endTimeDifference = availability.available_end_time.getTime() - currentSlotStart.getTime();
    const endDurationInMinutes = endTimeDifference / 1000 / 60;

    // If the endDurationInMinutes is equal to or greater than appointment_duration, add the time slot to availableTimeSlots
    if (endDurationInMinutes >= availability.appointment_duration) {
      availableTimeSlots.push({
        start_time: currentSlotStart,
        end_time: availability.available_end_time,
      });
    }

    res.status(200).json({ bookedAppointments, availableTimeSlots });
  } catch (error) {
    next(error);
  }
});

module.exports = getAllAppointments;
