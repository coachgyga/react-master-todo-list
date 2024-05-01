import { useState } from "react";
import Tasks from "./components/features/Tasks";
import CreateTaskForm from "./components/features/Tasks/CreateTaskForm";
import InputSearch from "./components/forms/InputSearch";
import Block from "./components/ui/Block";
import { generateMaxId } from "./utils/id.util";
import { generateDummyTasks, getSearchedTasks } from "./utils/tasks.util";

const dummyTasks = generateDummyTasks(3);

const App = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [searchTaskValue, setSearchTaskValue] = useState("");

  const handleDeleteTask = (taskId) => () => {
    setTasks(tasks.filter(({ id }) => id !== taskId));
  };

  const handleUpdateTask = (taskId) => (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updatedTask,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleCreateTask = (value) => {
    const idsList = tasks.map(({ id }) => id);
    const newId = generateMaxId(idsList);
    setTasks([
      ...tasks,
      {
        id: newId,
        title: value.title,
        created_at: new Date(),
      },
    ]);
  };

  const handleSearchTask = (value) => {
    setSearchTaskValue(value);
  };

  return (
    <div className="container">
      <h1 className="text--primary">Todo</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        <InputSearch
          label="Search a task"
          placeholder="Search..."
          value={searchTaskValue}
          onSearch={handleSearchTask}
          style={{ flexGrow: 1 }}
        />
      </div>
      <CreateTaskForm onSubmit={handleCreateTask}></CreateTaskForm>

      <Block>
        <Tasks
          tasks={
            searchTaskValue ? getSearchedTasks(tasks, searchTaskValue) : tasks
          }
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </Block>
    </div>
  );
};

export default App;
