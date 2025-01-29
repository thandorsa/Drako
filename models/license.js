const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    licenseKey: String,
    productName: String,
    discordUserID: String,
    builtbybitUserID: String,
    createdby: String,
    createdAt: Date,
    updatedAt: Date,
    ipList: [{ ip: String, createdAt: Date, _id: false }],
    hwidList: [{ hwid: String, createdAt: Date, _id: false }],
    totalRequests: Number,
    latestIP: String,
    latestHWID: String,
    expiresAt: { type: Date, default: null },
    assignedRole: { type: String, default: null }
});

module.exports = mongoose.model('License', schema);