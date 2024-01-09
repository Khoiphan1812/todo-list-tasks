import axios from "axios";

export const taskAPIs = {
  getAllTask: async (params) => {
    console.log(params, "params");
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}tasks`, {
      params: params,
    });
    return response;
  },
  getTaskById: async (taskId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}tasks/${taskId}`
    );
    return response.data;
  },
  createTask: async (task) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}tasks`,
        task
      );

      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);

      throw error; // This will allow the calling function to handle the error
    }
  },
  updateTaskById: async (id, taskUpdate) => {
    return await axios.patch(
      `${process.env.REACT_APP_BE_URL}tasks/${id}`,
      taskUpdate
    );
  },
  deleteTaskById: async (id) => {
    return await axios.delete(`${process.env.REACT_APP_BE_URL}tasks/${id}`);
  },
};
