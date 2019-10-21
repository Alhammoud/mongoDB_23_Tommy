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
        /* 
        console.log(" xxx ", allPoints); */

        
        let count = 0;
        allPoints.forEach(function (element) {
            if (element.aqm.noxevent > 20) {
                console.log(element);
                count++;
            }

        });

        /*         var query = Aqmpoint.find({ name: /john/i }, null, { skip: 10 });
         */

        console.log(' all records where noxevent > 20 are : ' + count);
    }

)()