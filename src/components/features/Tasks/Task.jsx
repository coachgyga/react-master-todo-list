import { string, instanceOf, func } from 'prop-types';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InputText from '../../forms/InputText';

const Task = ({ title, created_at, onDeleteTask: handleDeleteTask, onUpdateTask }) => {

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
			<td>{ created_at.toLocaleDateString('fr-FR') }</td>
			<td>
				<Button variant="danger" onClick={ handleDeleteTask }>Delete</Button>
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
};