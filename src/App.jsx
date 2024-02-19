import TasksContextProvider from './context/Tasks';
import Tasks from './components/features/Tasks';
import { Suspense, lazy } from 'react';

const Header = lazy(() => import('./components/layout/Header'));

const App = () => {

	return (
		<>
			<div className="container">
				<Suspense fallback={ <p>Loading header...</p> }>
					<Header />
				</Suspense>
			</div>
			<TasksContextProvider>
				<Tasks />
			</TasksContextProvider>
		</>
	);
};

export default App;