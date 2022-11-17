const mongoose = require('mongoose');

const FileEntity = new mongoose.Schema(
  {
    fileCode : {
      type: String,
      required: [true, 'Missing file code'],
      trim: true,
    },
    fileOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    }}
);

const File = mongoose.model("files", FileEntity);
module.exports = File;