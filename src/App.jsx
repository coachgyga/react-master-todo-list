import TasksContextProvider from './context/Tasks.context';
import Tasks from './components/features/Tasks';

const App = () => {

	return (
		<TasksContextProvider>
			<Tasks />
		</TasksContextProvider>
	);
};

export default App;