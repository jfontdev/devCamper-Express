const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotEnv = require("dotenv")

// Load env
dotEnv.config({path: "./config/config.env"})

// Load models
const Bootcamp = require("./models/Bootcamp")
const Course = require("./models/Course");
const User = require("./models/User")
const Review = require("./models/Review")

mongoose.connect(process.env.MONGO_URI)

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf8"))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, "utf8"))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf8"))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf8"))

// Import into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        await Review.create(reviews)

        console.log("Data imported...".green.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany()

        console.log("Data destroyed...".red.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === "-i") {
    importData()
} else if (process.argv[2] === "-d") {
    deleteData()
}
