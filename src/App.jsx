import { useEffect, useRef, useState, useTransition } from "react";
import Tasks from "./components/features/Tasks";
import InputSearch from "./components/forms/InputSearch";
import InputText from "./components/forms/InputText";
import Block from "./components/ui/Block";
import Button from "./components/ui/Button";
import { generateMaxId } from "./utils/id.util";
import { generateDummyTasks, getSearchedTasks } from "./utils/tasks.util";

const dummyTasks = generateDummyTasks(1000);

const App = () => {
  const newTaskInputRef = useRef(null);

  const [tasks, setTasks] = useState(dummyTasks);
  const [searchTaskValue, setSearchTaskValue] = useState("");

  const [isSearchTasksPending, startSearchTasksTransition] = useTransition();

  useEffect(() => {
    newTaskInputRef.current.value = "";
  }, [tasks]);

  const handleCreateNewTask = () => {
    const title = newTaskInputRef.current.value;
    const idsList = tasks.map(({ id }) => id);
    const newId = generateMaxId(idsList);
    setTasks([
      ...tasks,
      {
        id: newId,
        title,
        created_at: new Date(),
      },
    ]);
  };

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

  const handleSearchTask = (value) => {
    startSearchTasksTransition(() => {
      setSearchTaskValue(value);
    });
  };

  return (
    <div className="container">
      <h1 className="text--primary">Todo</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        <InputSearch
          label="Search a task"
          placeholder="Search..."
          onSearch={handleSearchTask}
          style={{ flexGrow: 1 }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        <InputText
          label="Add a new task"
          style={{ flexGrow: 1 }}
          ref={newTaskInputRef}
        />
        <Button onClick={handleCreateNewTask} style={{ marginTop: "auto" }}>
          Create
        </Button>
      </div>
      <Block>
        <Tasks
          isLoading={isSearchTasksPending}
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
