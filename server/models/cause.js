var mongoose = require('mongoose');

var causeSchema = mongoose.Schema({
        name        : String,
        is_image        : String,
});

module.exports = mongoose.model('Cause', causeSchema);
