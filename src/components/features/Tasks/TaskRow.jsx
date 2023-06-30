import { string, bool } from 'prop-types';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InputText from '../../forms/InputText';
import DeleteTaskConfirmationModal from './DeleteTaskConfirmationModal';
import Checkbox from '../../forms/Checkbox';
import useTasksContext from '../../../context/Tasks/useTasksContext';

const TaskRow = ({ id, title, createdAt, isDone }) => {

	const { updateTask, deleteTask } = useTasksContext();

	const [ isEditionModeActive, setIsEditionModeActive ] = useState(false);
	const editTaskInputRef = useRef(null);

	const handleEditTitle = () => {
		setIsEditionModeActive(true);
	}

	useEffect(() => {
		if (editTaskInputRef.current) {
			editTaskInputRef.current.value = title;
		}
	}, [ isEditionModeActive, title ]);

	const handleSaveTitle = (event) => {
		event.preventDefault();
		updateTask({
			id,
			title: editTaskInputRef.current.value,
		});
		setIsEditionModeActive(false);
	};

	const handleSwitchCompletedTask = (value) => {
		updateTask({
			id,
			isDone: value,
		});
	}

	const handleDeleteTask = () => {
		deleteTask(id);
	}

	return (
		<tr>
			<td>
			{
					isEditionModeActive ?
					<form onSubmit={ handleSaveTitle } style={{ display: 'flex', gap: 8 }}>
						<InputText ref={ editTaskInputRef } />
						<Button type="submit">Save</Button>
					</form>
					: <span role="button" onClick={ handleEditTitle }>{ title }</span>
				}
			</td>
			<td>{ new Date(createdAt).toLocaleDateString() }</td>
			<td><Checkbox value={ isDone } onChange={ handleSwitchCompletedTask } useCheckedAsValue /></td>
			<td>
				<DeleteTaskConfirmationModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

export default TaskRow;

TaskRow.propTypes = {
	id: string.isRequired,
	title: string.isRequired,
	createdAt: string.isRequired,
	isDone: bool,
};

TaskRow.defaultProps = {
	isDone: false,
};