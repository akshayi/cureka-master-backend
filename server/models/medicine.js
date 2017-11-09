var mongoose = require('mongoose');

var medicineSchema = mongoose.Schema({
        name        : String,
        imagepath   : String,
        attribute   : Object,
});

module.exports = mongoose.model('Medicine', medicineSchema);
