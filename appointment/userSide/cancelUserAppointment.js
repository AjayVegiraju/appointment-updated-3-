const Appointment = require('../models/appointment');

const cancelUserAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({ message: 'Please provide the appointment ID.' });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    appointment.status = 'canceled';

    const updatedAppointment = await appointment.save();
    res.status(200).json({ message: 'Appointment canceled successfully.', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling appointment: ' + error.message });
  }
};

module.exports = cancelUserAppointment;
