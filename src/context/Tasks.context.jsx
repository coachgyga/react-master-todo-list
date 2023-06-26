import { node } from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import { generateMaxId } from '../utils/id.util';
import tasksReducer from './Tasks.reducer';

export const TasksContext = createContext({
	tasks: [],
	allTasksCount: 0,
	todoTasksCount: 0,
	completedTasksCount: 0,
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

const INITIAL_TASKS_STATE_VALUE = {
	tasks: [],
	allTasksCount: 0,
	todoTasksCount: 0,
	completedTasksCount: 0,
};

const TasksContextProvider = ({ children }) => {

	const [ tasksState, dispatchTasksAction ] = useReducer(tasksReducer, INITIAL_TASKS_STATE_VALUE);

	const createTask = (newTask) => {
		const idsList = tasksState.tasks.map(({ id }) => id);
		const newId = generateMaxId(idsList);
		dispatchTasksAction({
			type: 'tasks/create',
			payload: {
				isDone: false,
				...newTask,
				id: newId,
				created_at: new Date(),
			},
		});
		dispatchTasksAction({ type: 'tasks/updateCounters' });
	};

	const deleteTask = (taskId) => {
		dispatchTasksAction({
			type: 'tasks/delete',
			payload: taskId,
		});
		dispatchTasksAction({ type: 'tasks/updateCounters' });
	};

	const updateTask = (taskToUpdate) => {
		dispatchTasksAction({
			type: 'tasks/update',
			payload: taskToUpdate,
		});
		dispatchTasksAction({ type: 'tasks/updateCounters' });
	};

	const contextValue = {
		tasks: tasksState.tasks,
		allTasksCount: tasksState.allTasksCount,
		todoTasksCount: tasksState.todoTasksCount,
		completedTasksCount: tasksState.completedTasksCount,
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