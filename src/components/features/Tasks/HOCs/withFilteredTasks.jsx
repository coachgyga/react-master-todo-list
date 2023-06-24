const withFilteredTasks = (TasksComponent, filterFunction) => {

	const FilteredTasks = (props) => {
		const tasks = filterFunction(props);
		return <TasksComponent {...props} tasks={ tasks } />;
	};

	return FilteredTasks;

};

export default withFilteredTasks;