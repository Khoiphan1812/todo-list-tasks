import React from "react";
import "./style.scss";
import { Button, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
  setSearchKey,
} from "../../redux/futures/tasks/taskSlice";
import { TASK_STATUS } from "../../constants/task.constant";

const HeaderComponent = () => {
  const naigate = useNavigate();
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.task.searchKey);
  const pagination = useSelector((state) => state.task.pagination);
  const location = useLocation();
  console.log(location);

  const handleCreateNewTask = () => {
    naigate(ROUTES.ADD_NEW);
  };

  const currentStatusSearch = (pathname) => {
    switch (pathname) {
      case "/all-task":
        return "";
      case "/new-task":
        return TASK_STATUS.NEW;
      case "/doing-task":
        return TASK_STATUS.DOING;
      case "/done-task":
        return TASK_STATUS.DONE;
      default:
        return "";
    }
  };

  const statusSearch = currentStatusSearch(location.pathname);

  const handleSearchTask = (event) => {
    event.preventDefault();
    dispatch(
      actFetchAllTask({
        _page: setNewPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...(!!statusSearch ? { status: statusSearch } : {}),
      })
    );
    dispatch(setNewPage(1));
  };

  const handleChangeInputSearch = (event) => {
    const value = event.target.value;
    dispatch(setSearchKey(value));
  };

  return (
    <div className="header-container">
      <Button onClick={handleCreateNewTask}>Create New Task</Button>
      <form
        className="header-container_search-area"
        onSubmit={handleSearchTask}
      >
        <Input
          placeholder="Please input search"
          value={searchKey}
          onChange={handleChangeInputSearch}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default HeaderComponent;
