import React, { useEffect } from "react";
import TaskForm from "../../components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actFecthTaskById } from "../../redux/futures/tasks/taskSlice";

const UpdateTask = () => {
  const task = useSelector((state) => state.task.currentTask);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(actFecthTaskById(params.id));
    // eslint-disable-next-line
  }, [params]);

  return (
    <div>
      <TaskForm isEdit={true} currentTask={task} />
    </div>
  );
};

export default UpdateTask;
