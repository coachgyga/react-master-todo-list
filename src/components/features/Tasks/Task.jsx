import { string, instanceOf, func } from 'prop-types';
import Button from '../../ui/Button';

const Task = ({ title, created_at, onDeleteTask: handleDeleteTask }) => {

	return (
		<tr>
			<td>
				{ title }
			</td>
			<td>{ created_at.toLocaleDateString() }</td>
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
};