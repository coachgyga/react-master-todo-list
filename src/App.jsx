import Block from './todo-list/src/components/ui/Block';
import Tasks from './components/features/Tasks';

const App = () => {

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<Block>
				<Tasks />
			</Block>
		</div>
	)
};

export default App;