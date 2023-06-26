const apiURL = 'http://localhost:3000';

const wait = (delay = 3000) => new Promise((resolve) => {
	setTimeout(() => resolve(), delay);
});

export const getTasks = async () => {
	try {
		await wait();
		const response = await fetch(`${apiURL}/tasks`);
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.error);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createTask = async (taskToCreate) => {
	try {
		const response = await fetch(`${apiURL}/tasks`, {
			method: 'POST',
			body: JSON.stringify(taskToCreate),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.error);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateTask = async (taskToUpdate) => {
	try {
		const response = await fetch(`${apiURL}/tasks`, {
			method: 'PUT',
			body: JSON.stringify(taskToUpdate),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.error);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteTask = async (taskIdToDelete) => {
	try {
		const response = await fetch(`${apiURL}/tasks/${ taskIdToDelete }`, {
			method: 'DELETE',
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.error);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
}