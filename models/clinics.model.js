const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  area: String,
  clinic: {
    type: String, 
    required: true,
    minlength: 3
  },
  doctor: [String],
  address: {
    type: String, 
    required: true,
    minlength: 4
  },
  phoneNumber: {
    type: String, 
    required: true,
    minlength: 10
  },
  faxNumber: String,
  website: String,
  specialty: String,
  notes: String,
  email: { 
    type: String,
    match: [/.+\@.+\..+/, "Invalid E-mail Address"],
  },
  caseCoordinator: String,
  alternatePhoneNumbers: String
})

const clinic = new mongoose.model('Clinic', clinicSchema);

module.exports = clinic;