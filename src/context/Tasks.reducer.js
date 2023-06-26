const tasksReducer = (state, action) => {

	switch (action.type) {
		case 'tasks/create':
			return {
				...state,
				tasks: [
					...state.tasks,
					action.payload
				],
			};
		case 'tasks/update':
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
		case 'tasks/delete':
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload),
			};
		case 'tasks/updateCounters':
			return {
				...state,
				allTasksCount: state.tasks.length,
				todoTasksCount: state.tasks.filter(task => !task.isDone).length,
				completedTasksCount: state.tasks.filter(task => task.isDone).length,
			}
		default:
			return state;
	}
};

export default tasksReducer;

