import Button from "../../ui/Button";
import "./Tasks.css";

import { array, func } from "prop-types";

const Tasks = ({ tasks, onDeleteTask: handleDeleteTask }) => {
  return (
    <>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Create At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks != "" ? (
            tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.date}</td>
                  <td>
                    <Button
                      onClick={handleDeleteTask(task.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>no data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Tasks;

Tasks.propTypes = {
  tasks: array.isRequired,
  onDeleteTask: func.isRequired,
};
