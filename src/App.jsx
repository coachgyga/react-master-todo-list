import Tasks from "./components/features/Tasks";
import Block from "./components/ui/Block";

const App = () => {
  return (
    <div className="container">
      <h1 className="text--primary">Todo</h1>
      <Block>
        <Tasks />
      </Block>
    </div>
  );
};

export default App;
