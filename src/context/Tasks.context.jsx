import { createContext } from 'react';

const TasksContext = createContext({
	deleteTask: (taskId) => taskId,
	updateTask: (taskToUpdate) => taskToUpdate,
});

export default TasksContext;

