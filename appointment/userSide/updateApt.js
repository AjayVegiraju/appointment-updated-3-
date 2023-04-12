const Appointment = require('../models/appointment');
const expressAsyncHandler = require("express-async-handler");

const updateUserAppointment = expressAsyncHandler (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start_time, end_time } = req.body;

    if(start_time){
      req.body.start_time = new Date(start_time);
    }

    if(end_time){
      req.body.end_time = new Date(end_time);
    }
    
    const updatedApt = await Appointment.findOneAndUpdate({_id: id, user: req.user._id }, req.body, {new: true});

    

    return res.status(200).json({
      success: true,
      data: updatedApt,
      message: "Appointment updtated successfully!"
    });


  } catch (error) {
    next(error);
  }
});

module.exports = updateUserAppointment;