const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//Database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB)
  .then((con) => {
    //console.log(con.connections);
    console.log("DB connection successful");
  })
  .catch((err) => console.log(err.message));

//Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
