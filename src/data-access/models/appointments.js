const mongoose = require('../mongodb');

const AppointmentSchema = new mongoose.Schema({
  doctor_id: { type: String },
  patient_id: { type: Number, unique: true },
  date: { type: String },
  start_time: {type: String},
  end_time: {type: String},
  slot_id:  {type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false }, { timestamps: true });

AppointmentSchema
  .pre('updateOne', function() {
    this.set({ updated_at: new Date() });
  })

module.exports = mongoose.model('appointments',AppointmentSchema);
