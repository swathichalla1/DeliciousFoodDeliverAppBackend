// models/ItemModel.js

const mongoose = require('mongoose');

// Define the schema for the items collection
const itemSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    description:{ type: String, required: true },
    originalPrice:{ type: Number, required: true },
    offer:{ type: Number, required: true },
    category:{ type: String, required: true },
    img:{ type: String, required: true },
});

// Create a model for the 'items' collection
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
