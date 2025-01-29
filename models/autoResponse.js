const mongoose = require('mongoose');

const autoResponseSchema = new mongoose.Schema({
    trigger: {
        type: String,
        required: true,
        unique: true,
    },
    responseType: {
        type: String,
        enum: ['TEXT', 'EMBED'],
        required: true,
    },
    responseText: {
        type: String,
    },
    embedData: {
        type: Object,
    },
    whitelistRoles: {
        type: [String],
        default: [],
    },
    blacklistRoles: {
        type: [String],
        default: [],
    },
    whitelistChannels: {
        type: [String],
        default: [],
    },
    blacklistChannels: {
        type: [String],
        default: [],
    },
});

const AutoResponse = mongoose.models.AutoResponse || mongoose.model('AutoResponse', autoResponseSchema);

module.exports = AutoResponse;