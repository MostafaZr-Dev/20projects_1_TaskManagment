export const initState = {
  tasks: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INIT_TASKS":
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
          },
        ],
      };

    case "EDIT_TASK":
      const tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.title = action.payload.title;
        }
        return task;
      });
      return {
        ...state,
        tasks,
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "DELETE_SELECTED_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => !action.payload.tasksIds.includes(task.id)
        ),
      };

    default:
      throw new Error("there is no handler for action");
  }
};
