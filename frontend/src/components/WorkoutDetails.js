import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workouts }) => {
  // console.log("workouts::", workouts);
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:4000/api/workouts/${workouts._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workouts && workouts.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workouts && workouts.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workouts && workouts.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workouts.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
