const Availability = require('../models/availability');
const Appointment = require('../models/appointment');

const deleteExpertAvailability = async (req, res) => {
  try {
    const { availabilityId } = req.params;

    if (!availabilityId) {
      return res.status(400).json({ message: 'Please provide the availability ID.' });
    }

    const availability = await Availability.findById(availabilityId);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found.' });
    }

    // Cancel appointments within the availability time range
    await Appointment.deleteMany({
      seller: availability.seller,
      start_time: { $gte: availability.available_start_time },
      end_time: { $lte: availability.available_end_time },
    });

    // Delete the availability
    await Availability.findByIdAndDelete(availabilityId);

    res.status(200).json({ message: 'Availability deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting availability: ' + error.message });
  }
};

module.exports = deleteExpertAvailability;