const bodySchema = {
    type: "object",
    properties: {
      doctor_id: {type: "string"},
      mobile_no_patient: {type: "string"},
      pin_code: {type: "string"},
      date: {type: "string"},
      start_time: {type: "string"},
      end_time: {type: "string"},
      slot_id: {type: "string"}
    },

    required: ["doctor_id", "mobile_no_patient",  "pin_code", "date", "start_time", "end_time", "slot_id"],
    additionalProperties: false
  }
  
  module.exports = bodySchema;
  