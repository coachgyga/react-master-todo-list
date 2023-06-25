import './Tasks.css';

import { arrayOf, shape, string, number, instanceOf, bool } from 'prop-types';
import Task from './Task';

const Tasks = ({ tasks, isLoading }) => {

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
						tasks.map((task) => <Task key={task.id} {...task} />)
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
		isDone: bool.isRequired,
		created_at: instanceOf(Date).isRequired,
	})),
	isLoading: bool,
};

Tasks.defaultProps = {
	tasks: [],
	isLoading: false,
};