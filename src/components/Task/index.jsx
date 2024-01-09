import React from "react";
import "./style.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { TASK_STATUS } from "../../constants/task.constant";

const Task = (props) => {
  const navigate = useNavigate();

  const handleRedirectionToEditPage = () => {
    const taskId = props.task.id;
    navigate(generatePath(ROUTES.UPDATE_TASK, { id: taskId }));
  };

  const statusColor = (status) => {
    switch (status) {
      case TASK_STATUS.NEW:
        return "blue";

      case TASK_STATUS.DOING:
        return "pink";

      case TASK_STATUS.DONE:
        return "green";

      default:
        return "green";
    }
  };

  return (
    <div className="task-container">
      <div
        className="task-container_title"
        onClick={handleRedirectionToEditPage}
      >
        Title: {props.task.title}
      </div>
      <div className="task-container_author">Cretor: {props.task.creator}</div>
      <div
        className="task-container_status"
        style={{
          color: statusColor(props.task.status),
        }}
      >
        Status: {props.task.status}
      </div>
      <div className="task-container_divider"></div>
      <div className="task-container_description">
        <div className="task-container_des-title">Description:</div>
        <div className="task-container_des-content">
          {props.task.description}
        </div>
      </div>
    </div>
  );
};

export default Task;
