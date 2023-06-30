import { string, instanceOf, bool, number } from 'prop-types';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InputText from '../../forms/InputText';
import DeleteTaskConfirmationModal from './DeleteTaskConfirmationModal';
import Checkbox from '../../forms/Checkbox';
import { useTasksContext } from '../../../context/Tasks.context';

const TaskRow = ({ id, title, created_at, isDone }) => {

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
			<td>{ created_at.toLocaleDateString() }</td>
			<td><Checkbox value={ isDone } onChange={ handleSwitchCompletedTask } useCheckedAsValue /></td>
			<td>
				<DeleteTaskConfirmationModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

export default TaskRow;

TaskRow.propTypes = {
	id: number.isRequired,
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	isDone: bool,
};

TaskRow.defaultProps = {
	isDone: false,
};