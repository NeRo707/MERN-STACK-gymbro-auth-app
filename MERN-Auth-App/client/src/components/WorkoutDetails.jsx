import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  if (!user) {
    return;
  }

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      // fetch the workout with the id of the clicked workout
      method: "DELETE", // delete the workout from the database with the id of the clicked workout
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json(); // get the response from the server and convert it to json
    const { id } = json.workout._id; // get the id of the clicked workout
    if (response.ok) {
      // if the response is ok (200) delete the workout from the database with the id of the clicked workout
      dispatch({ type: "DELETE_WORKOUT", payload: id }); // delete the workout with the id of the clicked workout
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
