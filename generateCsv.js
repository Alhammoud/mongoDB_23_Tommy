var mongoose = require('mongoose');

const fs = require('fs');

require('dotenv').config();

const Aqmpoint = require("./Aqmpoint");
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/* (async () => {
       // const allPoints = await Aqmpoint.find();
         
       // console.log(" xxx ", allPoints); 

        
        let count = 0;
        allPoints.forEach(function (element) {
            if (element.aqm.noxevent > 20) {
                console.log(element);
                count++;
            }

        });

         

        console.log(' all records where noxevent > 20 are : ' + count);
    }

)()

 */



(async () => {

        let csvContent = `System Time, Nox \n`;

        const allPoints = await Aqmpoint.find({
            'aqm.noxevent': {
                $gt: 20
                /* Syntax: {field: {$gt: value} }

                $gt selects those documents where the value of the field is greater than (i.e. >) the specified value. 
                
                $gte selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.)

                { <field>: { $eq: <value> } } 
                Specifies equality condition. The $eq operator matches documents where the value of a field equals the specified value.


                */
            }

        });
        allPoints.map(point => {
            csvContent += `${point.gps.system_time},${point.aqm.noxevent}\n`

        });
        console.log('csvContent :');
       // console.log(csvContent);

        // console.log(" xxx ", allPoints);


        /*                 CSV file                    */


        /*   
        
        // Check if the file exists in the current directory.
          fs.access(file, fs.constants.F_OK, (err) => {
              console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
          });

          // Check if the file is readable.
          fs.access(file, fs.constants.R_OK, (err) => {
              console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
          });

          // Check if the file is writable.
          fs.access(file, fs.constants.W_OK, (err) => {
              console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
          });

          // Check if the file exists in the current directory, and if it is writable.
          fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
              if (err) {
                  console.error(
                      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
              } else {
                  console.log(`${file} exists, and it is writable`);
              }
          }); 
          
          */

    await fs.writeFileSync('./file.csv',csvContent);

    console.log( " Export done ..!")


    }

)()