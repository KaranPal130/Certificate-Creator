const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { v4: uuidv4 } = require("uuid");

const certificateSchema = mongoose.Schema({
  certificateID: {
    type: String,
    default: uuidv4,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  issuerName: {
    type: String,
    required: true,
  },
  dateOfIssue: {
    type: Date,
    required: true,
  },
},
{
    timestamps: true,
  }
);

certificateSchema.plugin(toJSON);
certificateSchema.plugin(paginate);

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;