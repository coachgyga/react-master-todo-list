const tasksReducer = (state, action) => {

	switch (action.type) {
		case 'tasks/create':
			console.log('tasks/create', state);
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
		default:
			return state;
	}
};

export default tasksReducer;