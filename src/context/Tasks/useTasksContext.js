import { useContext } from 'react';
import { TasksContext } from '.';

const useTasksContext = () => {
	const context = useContext(TasksContext);
	if (context === null) {
		throw new Error('useTasksContext is null');
	}
	if (context === undefined) {
		throw new Error('useTasksContext was used outside of its Provider');
	}
	return context;
};

export default useTasksContext;