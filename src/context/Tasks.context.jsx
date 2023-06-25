import { node } from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { generateMaxId } from '../utils/id.util';

export const TasksContext = createContext({
	tasks: [],
	createTask: (newTask) => newTask,
	deleteTask: (taskId) => taskId,
	updateTask: (taskToUpdate) => taskToUpdate,
});

export const useTasksContext = () => {
	const context = useContext(TasksContext);
	if (context === null) {
		throw new Error('useTasksContext is null');
	}
	if (context === undefined) {
		throw new Error('useTasksContext was used outside of its Provider');
	}
	return context;
};

const TasksContextProvider = ({ children }) => {

	const [ tasks, setTasks ] = useState([]);

	const createTask = (newTask) => {
		const idsList = tasks.map(({ id }) => id);
		const newId = generateMaxId(idsList);
		setTasks([
			...tasks,
			{
				isDone: false,
				...newTask,
				id: newId,
				created_at: new Date(),
			},
		]);
	};

	const deleteTask = (taskId) => {
		setTasks(tasks.filter(({ id }) => id !== taskId));
	};

	const updateTask = (taskToUpdate) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === taskToUpdate.id) {
				return {
					...task,
					...taskToUpdate,
				};
			}
			return task;
		})
		setTasks(updatedTasks);
	};

	const contextValue = {
		tasks,
		createTask,
		deleteTask,
		updateTask,
	};

	return (
		<TasksContext.Provider value={contextValue}>
			{ children }
		</TasksContext.Provider>
	);
};

export default TasksContextProvider;

TasksContextProvider.propTypes = {
	children: node.isRequired,
};