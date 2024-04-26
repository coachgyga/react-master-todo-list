import "./Tasks.css";

import { arrayOf, func, instanceOf, number, shape, string } from "prop-types";
import Task from "./Task";

const Tasks = ({
  tasks,
  onDeleteTask: handleDeleteTask,
  onUpdateTask: handleUpdateTask,
}) => {
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
          {tasks.map((task) => (
            <Task
              key={task.id}
              onDeleteTask={handleDeleteTask(task.id)}
              onUpdateTask={handleUpdateTask(task.id)}
              {...task}
            />
          ))}
        </tbody>
      </table>
      {!tasks ||
        (tasks.length === 0 && <p style={{ textAlign: "center" }}>No data</p>)}
    </>
  );
};

export default Tasks;

Tasks.propTypes = {
  tasks: arrayOf(
    shape({
      id: number.isRequired,
      title: string.isRequired,
      created_at: instanceOf(Date).isRequired,
    })
  ),
  onDeleteTask: func.isRequired,
  onUpdateTask: func.isRequired,
};

Tasks.defaultProps = {
  tasks: [],
};
