const mongoose = require('../mongodb');
const autoIncrement = require('mongoose-sequence');
const AutoIncrement = autoIncrement(mongoose);

const PatientSchema = new mongoose.Schema({
  patient_id: { type: Number, unique: true },
  name: { type: String},
  mobile_no: { type: String },
  pin_code: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false }, { timestamps: true });

PatientSchema
  .pre('updateOne', function() {
    this.set({ updated_at: new Date() });
  })
  .plugin(AutoIncrement, {inc_field: 'patient_id'})
module.exports = mongoose.model('patients',PatientSchema);
