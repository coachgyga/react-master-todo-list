import Block from '../../todo-list/src/components/ui/Block';
import Tasks from './components/features/Tasks';
import { useState } from 'react';
import InputSearch from './components/forms/InputSearch';
import { generateMaxId } from './utils/id.util';
import { getSearchedTasks } from './utils/tasks.util';
import CreateTaskFormModal from './components/features/Tasks/CreateTaskFormModal';
import withFilteredTasks from './components/features/Tasks/HOCs/withFilteredTasks';
import Tabs from './components/ui/Tabs';
import TasksContext from './context/Tasks.context';

const tabs = [
	{
		id: 0,
		title: 'All',
	},
	{
		id: 1,
		title: 'Todo',
	},
	{
		id: 2,
		title: 'Completed',
	},
];

const AllFilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks, searchValue));
const TodoFilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks.filter(task => !task.isDone), searchValue));
const CompletedFilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks.filter(task => task.isDone), searchValue));

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
				isDone: false,
				created_at: new Date(),
			},
		]);
	};

	const deleteTask = (taskId) => {
		setTasks(tasks.filter(({ id }) => id !== taskId));
	};

	const updateTask = (taskToUpdate) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === taskToUpdate.id) {
				return {
					...task,
					...taskToUpdate,
				};
			}
			return task;
		})
		setTasks(updatedTasks);
	};

	const handleSearchTask = (value) => {
		setSearchTaskValue(value);
	};

	const contextValue = {
		deleteTask,
		updateTask,
	};

	return (
		<TasksContext.Provider value={ contextValue }>
			<div className="container">
				<h1 className="text--primary">Todo</h1>
				<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
					<InputSearch label="Search a task" placeholder="Search..." onSearch={ handleSearchTask } style={{ flexGrow: 1 }} />
					<CreateTaskFormModal onSubmit={ handleSubmitCreateTaskForm } />
				</div>
				<Block>
					<Tabs
						tabs={ tabs }
						defaultActiveTabId={ 0 }
						renderContent={
							({ activeTabId }) => (
								<>
									{ activeTabId === 0 && <AllFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> }
									{ activeTabId === 1 && <TodoFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } />}
									{ activeTabId === 2 && <CompletedFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> }
								</>
							)
						}
					/>
				</Block>
			</div>
		</TasksContext.Provider>
	);
};

export default App;