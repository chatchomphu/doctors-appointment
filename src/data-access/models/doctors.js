const mongoose = require('../mongodb');

const DoctorsSchema = new mongoose.Schema({
  doctor_id: { type: String },
  name: { type: String },
  appointment_date: [
    {
      day: { type: String },
      start_time: { type: String },
      end_time: { type: String },
    }
  ],
  period_slot:{ type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false }, { timestamps: true });

DoctorsSchema
  .pre('updateOne', function() {
    this.set({ updated_at: new Date() });
  })

module.exports = mongoose.model('doctors',DoctorsSchema);
