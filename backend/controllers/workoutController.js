const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

//Get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json({ workouts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get a single workout by id
const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Please provide a valid id" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update a workout by id
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//Delete a workout by id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
};
