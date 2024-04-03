const express = require("express");
const {
  createWorkout,
  getWorkoutById,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

//Get all workouts
router.get("/", getAllWorkouts);

//Get a workout by id
router.get("/:id", getWorkoutById);

//Create a new workout
router.post("/", createWorkout);

//Update a workout by id
router.patch("/:id", updateWorkout);

//Delete a workout by id
router.delete("/:id", deleteWorkout);

module.exports = router;
