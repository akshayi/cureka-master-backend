var mongoose = require('mongoose');

var attributeSchema = mongoose.Schema({
        name        : String,
        type        : String,
});

module.exports = mongoose.model('Attribute', attributeSchema);
