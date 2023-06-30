import { string, instanceOf, func, bool } from 'prop-types';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InputText from '../../forms/InputText';
import DeleteTaskConfirmModal from './DeleteTaskConfirmationModal';
import Checkbox from '../../forms/Checkbox';

const Task = ({ title, created_at, isDone, onDeleteTask: handleDeleteTask, onUpdateTask }) => {

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
		onUpdateTask({
			title: editTaskInputRef.current.value,
		});
		setIsEditionModeActive(false);
	};

	const handleSwitchCompletedTask = (value) => {
		onUpdateTask({
			isDone: value,
		});
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
				<DeleteTaskConfirmModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

export default Task;

Task.propTypes = {
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	onDeleteTask: func.isRequired,
	onUpdateTask: func.isRequired,
	isDone: bool,
};

Task.defaultProps = {
	isDone: false,
};