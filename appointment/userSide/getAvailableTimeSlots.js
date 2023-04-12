const expressAsyncHandler = require("express-async-handler");
const Availability = require("../../../models/availability");
const { Appointment } = require("../../../models/appointment");


const createUserAppointment = expressAsyncHandler(async (req, res, next) => {
  try {

    const checkAppointments = await Appointment.findOne({practitioner: req.params.id, start_time: new Date(req.body.start_time), end_time: new Date(req.body.end_time)});
    const availabilty = await Availability.findOne({practitioner: req.params.id, start_time: new Date(req.body.start_time), end_time: new Date(req.body.end_time)});

    

    return res.status(200).json({
      success: true,
      data: {availabilty: checkAppointments && availabilty ? true : false},
      message: "Appointment Verified successfully!",
    });

  } catch (error) {
   next(error);
  }
})

module.exports = createUserAppointment;