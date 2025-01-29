const mongoose = require('mongoose');

const TwitchStreamerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    discordUserId: {
        type: String,
        required: false,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('TwitchStreamers', TwitchStreamerSchema);