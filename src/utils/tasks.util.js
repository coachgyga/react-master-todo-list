export const generateDummyTasks = (numberOfTasks = 0) => {
	let tasks = [];
	for (let i = 0; i < numberOfTasks; i++) {
		tasks = [
			...tasks,
			{
				id: i,
				title: `New task ${i}`,
				isDeleted: false,
				isDone: true,
				created_at: new Date(),
			},
		];
	}
	return tasks;
};

export const getSearchedTasks = (tasks = [], searchValue = '') => {
	return tasks.filter(task => {
		if (task.title) {
			return task.title.toLowerCase().includes(searchValue.toLowerCase())
		}
	})
}