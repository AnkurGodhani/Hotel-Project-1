const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

exports.dbconnetion = () =>{
    mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
         console.log("DB Connetion Sucessfully.")
    }).catch((error)=>{
        console.log(error,"DBconnetion is Failed.")
        process.exit(1);
    })
}