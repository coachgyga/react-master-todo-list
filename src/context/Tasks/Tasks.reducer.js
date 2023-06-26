import { CREATE_TASK_ACTION, DELETE_TASK_ACTION, SET_TASKS_ACTION, TASKS_ERROR_ACTION, TASKS_IDLE_ACTION, TASKS_PENDING_ACTION, UPDATE_TASKS_COUNTERS_ACTION, UPDATE_TASK_ACTION } from './Tasks.actions';

export const TASKS_LOADING_STATE = {
	IDLE: 'idle',
	PENDING: 'pending',
	ERROR: 'error',
}

const tasksReducer = (state, action) => {

	switch (action.type) {
		case SET_TASKS_ACTION:
			return {
				...state,
				tasks: action.payload,
			};
		case CREATE_TASK_ACTION:
			return {
				...state,
				tasks: [
					...state.tasks,
					action.payload
				],
			};
		case UPDATE_TASK_ACTION:
			return {
				...state,
				tasks: state.tasks.map(task => {
					if (task.id === action.payload.id) {
						return {
							...task,
							...action.payload,
						};
					}
					return task;
				}),
			};
		case DELETE_TASK_ACTION:
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload),
			};
		case UPDATE_TASKS_COUNTERS_ACTION:
			return {
				...state,
				allTasksCount: state.tasks.length,
				todoTasksCount: state.tasks.filter(task => !task.isDone).length,
				completedTasksCount: state.tasks.filter(task => task.isDone).length,
			};
		case TASKS_IDLE_ACTION:
			return {
				...state,
				loading: TASKS_LOADING_STATE.IDLE,
				errorMessage: '',
			};
		case TASKS_PENDING_ACTION:
			return {
				...state,
				loading: TASKS_LOADING_STATE.PENDING,
				errorMessage: '',
			};
		case TASKS_ERROR_ACTION:
			return {
				...state,
				loading: TASKS_LOADING_STATE.ERROR,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};

export default tasksReducer;

