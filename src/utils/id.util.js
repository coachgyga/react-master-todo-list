export const generateMaxId = (idsList = []) => {
	const maxId = idsList.length > 0 ? Math.max(...idsList) : 0;
	return maxId + 1;
};