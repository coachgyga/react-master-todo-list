import { useState } from 'react';
import { getSearchedTasks } from '../../../utils/tasks.util';
import InputSearch from '../../forms/InputSearch';
import Block from '../../ui/Block';
import Tabs from '../../ui/Tabs';
import withFilteredTasks from './HOCs/withFilteredTasks';
import useTasksContext from '../../../context/Tasks/useTasksContext';
import TasksTable from './TasksTable';
import CreateTaskFormModal from './CreateTaskFormModal';
import { TASKS_LOADING_STATE } from '../../../context/Tasks/Tasks.reducer';

const AllFilteredTasksTable = withFilteredTasks(TasksTable, ({ tasks, searchValue }) => getSearchedTasks(tasks, searchValue));
const TodoFilteredTasksTable = withFilteredTasks(TasksTable, ({ tasks, searchValue }) => getSearchedTasks(tasks.filter(task => !task.isDone), searchValue));
const CompletedFilteredTasksTable = withFilteredTasks(TasksTable, ({ tasks, searchValue }) => getSearchedTasks(tasks.filter(task => task.isDone), searchValue));

const Tasks = () => {

	const { tasks, allTasksCount, todoTasksCount, completedTasksCount, createTask, loading, errorMessage } = useTasksContext();

	const [ searchTaskValue, setSearchTaskValue ] = useState('');

	const tabs = [
		{
			id: 0,
			title: `All (${ allTasksCount })`,
		},
		{
			id: 1,
			title: `Todo (${ todoTasksCount })`,
		},
		{
			id: 2,
			title: `Completed (${ completedTasksCount} )`,
		},
	];

	const handleSubmitCreateTaskForm = (values) => createTask(values);

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
				{
					loading === TASKS_LOADING_STATE.ERROR ? <p style={ { color: 'red', textAlign: 'center' } }>{ errorMessage ? errorMessage : 'An error occured.' }</p> : null
				}
				<Tabs
					tabs={ tabs }
					defaultActiveTabId={ 0 }
					renderContent={
						({ activeTabId }) => (
							<>
								{ activeTabId === 0 && <AllFilteredTasksTable tasks={ tasks } searchValue={ searchTaskValue } isLoading={ loading === TASKS_LOADING_STATE.PENDING } /> }
								{ activeTabId === 1 && <TodoFilteredTasksTable tasks={ tasks } searchValue={ searchTaskValue } isLoading={ loading === TASKS_LOADING_STATE.PENDING } />}
								{ activeTabId === 2 && <CompletedFilteredTasksTable tasks={ tasks } searchValue={ searchTaskValue } isLoading={ loading === TASKS_LOADING_STATE.PENDING } /> }
							</>
						)
					}
				/>
			</Block>
		</div>
	);
}

export default Tasks;