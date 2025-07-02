const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  name: String,
  docType: String,
  issueDate: String,
  ipfsUrl: String,
  issuer: String,
});

module.exports = mongoose.model('Document', DocumentSchema);