import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../futures/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    task: tasksReducer,
  },
});
