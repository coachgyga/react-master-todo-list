import { node } from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import tasksReducer, { TASKS_LOADING_STATE } from './Tasks.reducer';
import { getTasks, createTask as createTaskRequest, updateTask as updateTaskRequest, deleteTask as deleteTaskRequest } from '../../services/tasks.service';
import { CREATE_TASK_ACTION, DELETE_TASK_ACTION, SET_TASKS_ACTION, TASKS_ERROR_ACTION, TASKS_IDLE_ACTION, TASKS_PENDING_ACTION, UPDATE_TASKS_COUNTERS_ACTION, UPDATE_TASK_ACTION } from './Tasks.actions';

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
	loading: TASKS_LOADING_STATE.IDLE,
	errorMessage: '',
};

const TasksContextProvider = ({ children }) => {

	const [ tasksState, dispatchTasksAction ] = useReducer(tasksReducer, INITIAL_TASKS_STATE_VALUE);

	useEffect(() => {
		dispatchTasksAction({ type: TASKS_PENDING_ACTION });
		getTasks()
		.then(data => {
			dispatchTasksAction({
				type: SET_TASKS_ACTION,
				payload: data.rows,
			});
			dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
			dispatchTasksAction({ type: TASKS_IDLE_ACTION });
		})
		.catch(error => {
			dispatchTasksAction({ type: TASKS_ERROR_ACTION, payload: error.message });
		});
	}, []);

	const createTask = async (newTask) => {
		try {
			const createdTask = await createTaskRequest(newTask);
			dispatchTasksAction({
				type: CREATE_TASK_ACTION,
				payload: createdTask,
			});
			dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
		} catch (error) {
			dispatchTasksAction({ type: TASKS_ERROR_ACTION, payload: error.message });
		}
	};

	const deleteTask = async (taskId) => {
		try {
			await deleteTaskRequest(taskId);
			dispatchTasksAction({
				type: DELETE_TASK_ACTION,
				payload: taskId,
			});
			dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
		} catch (error) {
			dispatchTasksAction({ type: TASKS_ERROR_ACTION, payload: error.message });
		}
	};

	const updateTask = async (taskToUpdate) => {
		try {
			await updateTaskRequest(taskToUpdate);
			dispatchTasksAction({
				type: UPDATE_TASK_ACTION,
				payload: taskToUpdate,
			});
			dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
		} catch (error) {
			dispatchTasksAction({ type: TASKS_ERROR_ACTION, payload: error.message });
		}
	};

	const contextValue = {
		tasks: tasksState.tasks,
		allTasksCount: tasksState.allTasksCount,
		todoTasksCount: tasksState.todoTasksCount,
		completedTasksCount: tasksState.completedTasksCount,
		loading: tasksState.loading,
		errorMessage: tasksState.errorMessage,
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