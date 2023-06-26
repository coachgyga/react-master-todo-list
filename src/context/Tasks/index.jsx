import { node } from 'prop-types';
import { createContext, useReducer } from 'react';
import { generateMaxId } from '../../utils/id.util';
import tasksReducer from './Tasks.reducer';
import { CREATE_TASK_ACTION, DELETE_TASK_ACTION, UPDATE_TASKS_COUNTERS_ACTION, UPDATE_TASK_ACTION } from './Tasks.actions';

export const TasksContext = createContext({
	tasks: [],
	allTasksCount: 0,
	todoTasksCount: 0,
	completedTasksCount: 0,
	createTask: (newTask) => newTask,
	deleteTask: (taskId) => taskId,
	updateTask: (taskToUpdate) => taskToUpdate,
});

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
			type: CREATE_TASK_ACTION,
			payload: {
				isDone: false,
				...newTask,
				id: newId,
				created_at: new Date(),
			},
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	};

	const deleteTask = (taskId) => {
		dispatchTasksAction({
			type: DELETE_TASK_ACTION,
			payload: taskId,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	};

	const updateTask = (taskToUpdate) => {
		dispatchTasksAction({
			type: UPDATE_TASK_ACTION,
			payload: taskToUpdate,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
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