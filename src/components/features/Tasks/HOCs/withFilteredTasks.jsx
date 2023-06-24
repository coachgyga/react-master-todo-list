const withFilteredTasks = (TasksComponent, filterFunction) => {

	const FilteredTasks = (props) => {
		const filteredTasks = filterFunction(props);
		return <TasksComponent {...props} tasks={ filteredTasks } />;
	};

	return FilteredTasks;

};

export default withFilteredTasks;