import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  //Fetch data from backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const data = await response.json();

      if (response.ok) {
        console.log(data.workouts);
        dispatch({ type: "SET_WORKOUTS", payload: data.workouts });
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workouts={workout} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  );
};

export default Home;
