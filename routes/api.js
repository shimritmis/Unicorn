const express= require ('express');
const router = express.Router();
const Unicorn = require ('../models/unicorn')


//get a list of unicorns from the db
router.get('/unicorns', function (req, res, next) {
    Unicorn.aggregate().near({near:
        {'type':'Point', 
        'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
     maxDistance:100000, spherical: true, distanceField:"dist.calculated" }
    ).then(function(unicorns){
        res.send(unicorns);
    }).catch(next);
});

//add a new Unicorn to the db
router.post('/unicorns', function (req, res, next) {
    Unicorn.create(req.body).then(function(unicorn) {
        res.send(unicorn); //mongoose will send a unique id
    }).catch(next);
});

//update aUnicorn in the db
router.put('/unicorns/:id', function (req, res, next) {
    Unicorn.findByIdAndUpdate({_id:req.params.id} , req.body).then(function(){
        Unicorn.findOne({_id:req.params.id}).then(function(unicorn){
            res.send(unicorn); 
        }); 
    });
});

//delete a Unicorn from the db
router.delete('/unicorns/:id', function (req, res, next) {
    Unicorn.findByIdAndRemove({_id:req.params.id})
    .then(function(unicorn){
        res.send(unicorn);
    });
});

module.exports = router;
