const express = require('express');

const Item = require('../Models/Item.js'); 

// Route to get all items from the 'items' collection
const getItems = async (req, res) => {
  try {
    const items = await Item.find(); 
    res.status(200).json(items); 
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error: error.message });
  }
};

// Route to get detailed view of a specific item by its ID
const getDetailedView = async(req,res)=>{
  const {id}=req.params
  
  try{
    const detailedItem = await Item.findOne({ _id: id }); 
    if (!detailedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(detailedItem);
  }
  
catch(e){
  res.status(500).json({ message: `Error retrieving detailed view of item, error: ${e}`});
}
}

module.exports = {getItems,getDetailedView};
