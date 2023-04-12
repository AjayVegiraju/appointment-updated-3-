const expressAsyncHandler = require("express-async-handler");
const { Appointment } = require("../../../models/appointment");


module.exports.getApt = expressAsyncHandler(async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const appointmentCount = await Appointment.countDocuments({
      user: req.user._id,
    });

    const appointments = await Appointment.find({
      user: req.user._id,

    }).skip(skip).limit(limit);

    const nextPage = page * limit < appointmentCount ? true : false;

    return res.status(200).json({
      data: {
        total: appointmentCount,
        appointments: appointments,
        next: nextPage,
      },
      success: true,
      message: "Appointments retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});