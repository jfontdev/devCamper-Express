const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotEnv = require("dotenv")

// Load env
dotEnv.config({path: "./config/config.env"})

// Load models
const Bootcamp = require("./models/Bootcamp")

mongoose.connect(process.env.MONGO_URI, {})

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json` , "utf8"))

// Import into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);

        console.log("Data imported...".green.inverse)
        process.exit()
    }catch (err){
        console.error(err)
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();

        console.log("Data destroyed...".red.inverse)
        process.exit()
    }catch (err){
        console.error(err)
    }
}

if (process.argv[2] === "-i"){
    importData()
}else if (process.argv[2] === "-d"){
    deleteData()
}
