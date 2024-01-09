import React, { useEffect } from "react";
import MainContentTask from "../../components/MainContentTask";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
} from "../../redux/futures/tasks/taskSlice";
import { Pagination, Spin } from "antd";
import "./style.scss";
import { TASK_STATUS } from "../../constants/task.constant";

const DoingTask = () => {
  const dispatch = useDispatch();
  const { isLoading, tasks, pagination, searchKey } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.DOING,
      })
    );
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllTask({
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.DOING,
      })
    );
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="no-task">No tasks</div>
      ) : (
        <>
          <MainContentTask tasks={tasks} />

          <Pagination
            defaultPageSize={pagination.limitPerPage}
            current={pagination.currentPage}
            total={pagination.total}
            onChange={handleChangePage}
          />
        </>
      )}
    </div>
  );
};

export default DoingTask;
