const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// Mapping
router.use((req, res, next)=>{
    Campaign.createMapping(function(err, mapping){  
        if(err){
          console.log('error creating mapping (you can safely ignore this)');
          console.log(err);
        }else{
          console.log('mapping created!');
          console.log(mapping);
        }
      });
    next();
  });


//   Creating Campaign
router.post("/campaign",(req,res) => {
    var campaign = new Campaign(req.body);
      campaign.save(function(err) {  
       if(err){console.log(err);}
       else{
        campaign.on('es-indexed', function(err,resp) {
            if(err){console.log(err);}
            else{res.send(resp);}
        }  );
       }
      
      });

});

// search campaign by parameter(location,name,description) and term.
router.post("/search", function(req,res) {
    var terms=req.body.terms;
    var parameter = req.body.parameter;
    Campaign.find({ [parameter]: new RegExp(terms, 'i') }, function(err,campaigns,count) {
      res.json({ terms:terms, campaigns:campaigns })
    });
  });


  //   Creating Campaign
router.post("/campaign",(req,res) => {
    var campaign = new Campaign(req.body);
      campaign.save(function(err) {  
       if(err){console.log(err);}
       else{
        campaign.on('es-indexed', function(err,resp) {
            if(err){console.log(err);}
            else{res.send(resp);}
        }  );
       }
      
      });

});

// Delete Campaign by Id
router.delete("/delete/:id", function(req, res) {
    Campaign.findById(req.params.id, function(err, campaign) {
      campaign.remove(function(err) {
        if(!err){
            console.log('campaign deleted');
            res.send("campaign deleted")}
      });
    });
  });

// Update Campaign by id
  router.post('/update/:id', function(req, res) {
      console.log(req.params.id);
      Campaign.findById(req.params.id, function(err, campaign) {
          if(err){res.send(err)}
          if(campaign){
            campaign.name = req.body.name;
            campaign.location = req.body.location;
            campaign.description = req.body.description;
            campaign.save((err,updatedCampaign) =>{
                if(err){res.send(err)}
                if(updatedCampaign){res.send(updatedCampaign)}
            })
          }
      });

  });



module.exports = router ;