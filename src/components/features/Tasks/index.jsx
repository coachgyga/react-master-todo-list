import './Tasks.css';

import { arrayOf, shape, string, number, instanceOf, func, bool } from 'prop-types';
import Task from './Task';

const Tasks = ({ tasks, onDeleteTask: handleDeleteTask, onUpdateTask: handleUpdateTask, isLoading }) => {

	return (
		<>
			<table className="tasks-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						!isLoading &&
						tasks.map((task) => <Task key={task.id} onDeleteTask={ handleDeleteTask(task.id) } onUpdateTask={ handleUpdateTask(task.id) } {...task} />)
					}
				</tbody>
			</table>
			{ !tasks || tasks.length === 0 && <p style={{ textAlign: 'center' }}>No data</p>}
			{ isLoading && <p style={{ textAlign: 'center' }}>Loading data...</p>}
		</>
	);
};

export default Tasks;

Tasks.propTypes = {
	tasks: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired,
		created_at: instanceOf(Date).isRequired,
	})),
	onDeleteTask: func.isRequired,
	onUpdateTask: func.isRequired,
	isLoading: bool,
};

Tasks.defaultProps = {
	tasks: [],
	isLoading: false,
};