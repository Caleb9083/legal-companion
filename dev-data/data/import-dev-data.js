const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "../../.env" });
const Instrument = require("../../models/instrumentModel");


//Database
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB)
    .then((con) => {
        //console.log(con.connections);
        console.log("DB connection successful");
    })
    .catch((err) => console.log(err.message));

//Read JSON file
const instruments = JSON.parse(
    fs.readFileSync(`${__dirname}/constitutions-data.json`, "utf-8")
);

//Import Data Into DB
const importData = async () => {
    try {
        await Instrument.create(instruments);
        console.log("Data successfully loaded!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Instrument.deleteMany();
        console.log("Data successfully deleted!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

//console.log(process.argv);
