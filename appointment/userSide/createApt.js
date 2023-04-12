const expressAsyncHandler = require("express-async-handler");
const Appointment = require("../../models/");

const createUserAppointment = expressAsyncHandler(async (req, res, next) => {
  try {
    const { practioner, start_time, end_time} = req.body;

    const createdApt = await Appointment.create({
      practioner,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      user: req.user._id
    });

    return res.status(200).json({
      success: true,
      data: createdApt,
      message: "Appointment created successfully!",
    });

  } catch (error) {
   next(error);
  }
})

module.exports = createUserAppointment;