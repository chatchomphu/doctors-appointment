const mongoose = require('../mongodb');

const FreeSlotSchema = new mongoose.Schema({
  doctor_id: { type: String },
  date:{ type: Date },
  day: { type: String},
  start_time: { type: String},
  end_time: { type: String},
  is_reserved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false }, { timestamps: true });

FreeSlotSchema
  .pre('updateOne', function() {
    this.set({ updated_at: new Date() });
  })

module.exports = mongoose.model('free_slots',FreeSlotSchema);
