import { useEffect, useRef, useState } from "react";
import Tasks from "./components/features/Tasks";
import Block from "./components/ui/Block";
import Button from "./components/ui/Button";

let nextId = 0;
const App = () => {
  const [tasks, setTasks] = useState([]);

  const newTaskInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = newTaskInputRef.current.value;
    const date = new Date().toLocaleDateString();
    nextId++;
    // console.log(e.target.todoName.value);
    setTasks([...tasks, { id: nextId, title: newTask, date: date }]);
  };

  useEffect(() => {
    newTaskInputRef.current.value = "";
  }, [tasks]);

  return (
    <div className="container">
      <h1 className="text--primary">Todo</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "24px",
          width: "100%",
        }}
      >
        <input
          type="text"
          name="todoName"
          placeholder="Entrez votre tâche"
          ref={newTaskInputRef}
          style={{
            flexGrow: "1",
            border: "0",
            borderRadius: "5px",
          }}
        ></input>
        <Button variant="primary">Create</Button>
      </form>

      <Block>
        <Tasks tasks={tasks} />
      </Block>
    </div>
  );
};

export default App;
