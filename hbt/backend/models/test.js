const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const ParentSchema = new mongoose.Schema({
    title: String,
    children: [ChildSchema]
});

module.exports = mongoose.model('Parent', ParentSchema);