require("dotenv").config();
const express = require("express");
const workoutsRouter = require("./routes/workouts");
const mongoose = require("mongoose");
const cors = require("cors");

//Express app
const app = express();

//Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

//Routes
app.use("/api/workouts", workoutsRouter);

//Connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to db");
    //Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port 4000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to db", err);
  });
