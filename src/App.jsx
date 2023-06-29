import Block from './components/ui/Block';
import Tasks from './components/features/Tasks';
import { useState } from 'react';
import InputSearch from './components/forms/InputSearch';
import { generateMaxId } from './utils/id.util';
import { getSearchedTasks } from './utils/tasks.util';
import CreateTaskFormModal from './components/features/Tasks/CreateTaskFormModal';

const App = () => {

	const [ tasks, setTasks ] = useState([]);
	const [ searchTaskValue, setSearchTaskValue ] = useState('');

	const handleSubmitCreateTaskForm = (values) => {
		const idsList = tasks.map(({ id }) => id);
		const newId = generateMaxId(idsList);
		setTasks([
			...tasks,
			{
				id: newId,
				title: values.title,
				created_at: new Date(),
			},
		]);
	};

	const handleDeleteTask = (taskId) => () => {
		setTasks(tasks.filter(({ id }) => id !== taskId));
	};

	const handleUpdateTask = (taskId) => (updatedTask) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				return {
					...task,
					...updatedTask,
				};
			}
			return task;
		})
		setTasks(updatedTasks);
	};

	const handleSearchTask = (value) => {
		setSearchTaskValue(value);
	};

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
				<InputSearch label="Search a task" placeholder="Search..." onSearch={ handleSearchTask } style={{ flexGrow: 1 }} />
				<CreateTaskFormModal onSubmit={ handleSubmitCreateTaskForm } />
			</div>
			<Block>
				<Tasks tasks={ searchTaskValue ? getSearchedTasks(tasks, searchTaskValue) : tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
			</Block>
		</div>
	);
};

export default App;