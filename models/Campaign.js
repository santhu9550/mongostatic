const mongoose = require("mongoose");

const mongoosastic=require("mongoosastic");

var campaignSchema = new mongoose.Schema({  
  name: String,
  location: String,
  description: { type:String, es_indexed:true },
  date : {
    type:Date,
    default:Date.now()
  }
});

campaignSchema.plugin(mongoosastic);  

module.exports = Campaign = mongoose.model("campaigns", campaignSchema);