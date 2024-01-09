import React from "react";
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllTask from "./page/AllTask";
import { ROUTES } from "./constants/routes";
import NewTask from "./page/NewTask";
import DoingTask from "./page/DoingTask";
import DoneTask from "./page/DoneTask";
import MainLayout from "./layouts/MainLayout";
import AddNewTask from "./page/AddNewTask";
import UpdateTask from "./page/UpdateTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.ALL_TASK} element={<AllTask />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask />} />
            <Route path={ROUTES.NEW_TASK} element={<NewTask />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTask />} />
            <Route path={ROUTES.DONE_TASK} element={<DoneTask />} />
            <Route path={ROUTES.ADD_NEW} element={<AddNewTask />} />
          </Route>
          <Route path={"/"} element={<Navigate to={ROUTES.ALL_TASK} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
