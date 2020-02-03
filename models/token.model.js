const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenId: String,
    userId: String,
});

mongoose.model('tokens', tokenSchema);