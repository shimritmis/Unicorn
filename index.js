const express= require ('express');
const bodyParser = require('body-parser'); 
const mongoose = require ('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/unicorns', { useNewUrlParser: true }); //although ninjago doesn't exist yet, when we'll conect to it, mongoose will gonna see it and create it for us.
mongoose.Promise = global.Promise; 

//express static
app.use(express.static('public'));

//have to be the first of all middlewares!
app.use(bodyParser.json()); 

//Initialize routes
app.use('/api', require ('./routes/api'));

//Error Handling Middleware
app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log("now listening for requests!"); 
});
