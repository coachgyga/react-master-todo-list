export const wait = (delay = 100) => {
	const start = Date.now();
	while (Date.now() - start < delay) {
		// do nothing
	}
};