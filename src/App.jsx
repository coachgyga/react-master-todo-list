import { useRef } from 'react';
import Block from '../../todo-list/src/components/ui/Block';
import Tasks from './components/features/Tasks';
import Button from '../../todo-list/src/components/ui/Button';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {

	const newTaskInputRef = useRef(null);

	const [ tasks, setTasks ] = useState([]);

	useEffect(() => {
		newTaskInputRef.current.value = '';
	}, [ tasks ]);

	const handleCreateNewTask = () => {
		const title = newTaskInputRef.current.value;
		const idsList = tasks.map(({ id }) => id);
		const maxId = idsList.length > 0 ? Math.max(...idsList) : 0;
		const newId = maxId + 1;
		setTasks([
			...tasks,
			{
				id: newId,
				title,
				created_at: new Date(),
			},
		]);
	};

	const handleDeleteTask = (taskId) => () => {
		setTasks(tasks.filter(({ id }) => id !== taskId));
	};

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
				<input style={{ flexGrow: 1, borderRadius: 8, border: 'none', padding: '0.5rem 1rem' }} ref={ newTaskInputRef } />
				<Button onClick={ handleCreateNewTask }>Create</Button>
			</div>
			<Block>
				<Tasks tasks={ tasks } onDeleteTask={ handleDeleteTask }/>
			</Block>
		</div>
	);
};

export default App;