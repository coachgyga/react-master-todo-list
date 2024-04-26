import { useEffect, useRef, useState } from "react";
import Tasks from "./components/features/Tasks";
import { InputText } from "./components/forms/InputText";
import Block from "./components/ui/Block";
import Button from "./components/ui/Button";

const App = () => {
  const newTaskInputRef = useRef(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    newTaskInputRef.current.value = "";
  }, [tasks]);

  const handleCreateNewTask = () => {
    const title = newTaskInputRef.current.value;
    const idsList = tasks.map(({ id }) => id);
    const maxId = idsList.length > 0 ? Math.max(...idsList) : 0;
    const newId = maxId + 1;
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

  return (
    <div className="container">
      <h1 className="text--primary">Todo</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        <InputText
          style={{
            flexGrow: 1,
          }}
          label="Add a new task"
          ref={newTaskInputRef}
        />
        <Button onClick={handleCreateNewTask}>Create</Button>
      </div>
      <Block>
        <Tasks
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </Block>
    </div>
  );
};

export default App;
