const { randomBytes } = require('crypto');
const mongoose = require('mongoose');

const FileEntity = new mongoose.Schema(
  {
    fileCode : {
      type: String,
      required: [true, 'Missing file code'],
      trim: true,
    },
    fileSecurityKey : {
      type: String,
      required: true,
      trim: true,
    },
    fileInitVector : {
      type: String,
      required: true,
      trim: true,
    },
    fileOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    fileUploadedDateTime: {
      type: Date,
      required: false,
      trim: true
    }}
);

const File = mongoose.model("files", FileEntity);
module.exports = File;