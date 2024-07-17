const express = require("express")
const app = express();
const router = require("./router/routers")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();

let PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser())
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)


const DBconnetion = require("./database/database");
const { cloudinaryConnetions } = require("./database/cloudinary");
const fileUpload = require("express-fileupload")
DBconnetion.dbconnetion();

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp/",
		
	})
)

cloudinaryConnetions();


app.use("/api/v2",router)

app.get("/",(req,res)=>{
     res.send("WECOME TO HOTEL MENGEMT SYSTEM");
})

app.listen(PORT,function(req,res){
    console.log(`SERVER IS STRATING FOR ${PORT} PROT NUMBER.`)
})