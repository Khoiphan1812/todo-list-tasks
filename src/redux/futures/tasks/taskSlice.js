import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskAPIs } from "../../../apis/taskApis";
import { message } from "antd";

const initialState = {
  isLoading: false,
  tasks: [],
  currentTask: {},
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 12,
    total: 12,
  },
  searchKey: "",
  noResultsFound: false,
};

export const actFetchAllTask = createAsyncThunk(
  "task/fetchAllTask",
  async (params = {}) => {
    const response = await taskAPIs.getAllTask(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const actFecthTaskById = createAsyncThunk(
  "tasks/fecthTaskById",
  async (taskId) => {
    const task = await taskAPIs.getTaskById(taskId);
    return task;
  }
);

export const actUpdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, taskUpdate }) => {
    await taskAPIs.updateTaskById(id, taskUpdate);
    return null;
  }
);

export const actDeleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id) => {
    await taskAPIs.deleteTaskById(id);
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    actSetTask: (state, action) => {
      state.tasks = action.payload;
    },
    resetCurrentTask: (state, action) => {
      state.currentTask = {};
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload.data;
      state.pagination.total = parseInt(action.payload.total, 10);
      state.noResultsFound = state.tasks.length === 0;
      if (state.tasks.length === 0) {
        message.info("Không tìm thấy.");
      }
    });
    builder.addCase(actFecthTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
      message.success("Cập nhật thành công");
    });
  },
});

export const actCreateNewTask = createAsyncThunk(
  "task/createNewTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await taskAPIs.createTask(taskData);
      message.success("Tạo mới thành công");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { actSetTask, setNewPage, setSearchKey, setLoading } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
