import './Tasks.css';

import { arrayOf, shape, string, number, instanceOf, bool } from 'prop-types';
import TaskRow from './TaskRow';

const TasksTable = ({ tasks, isLoading }) => {

	return (
		<>
			<table className="tasks-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created At</th>
						<th>Completed</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						!isLoading &&
						tasks.map((task) => <TaskRow key={task.id} {...task} />)
					}
				</tbody>
			</table>
			{ !tasks || tasks.length === 0 && <p style={{ textAlign: 'center' }}>No data</p>}
			{ isLoading && <p style={{ textAlign: 'center' }}>Loading data...</p>}
		</>
	);
};

export default TasksTable;

TasksTable.propTypes = {
	tasks: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired,
		isDone: bool.isRequired,
		created_at: instanceOf(Date).isRequired,
	})),
	isLoading: bool,
};

TasksTable.defaultProps = {
	tasks: [],
	isLoading: false,
};