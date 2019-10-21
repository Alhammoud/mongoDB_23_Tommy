var mongoose = require('mongoose');

require('dotenv').config();

const Aqmpoint = require("./Aqmpoint");
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
     useUnifiedTopology: true
});

(async () => {
    const allPoints = await Aqmpoint.find();
    console.log(" xxx ", allPoints);
    
     } 

)()