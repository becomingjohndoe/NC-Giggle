export const daysToGo = (date) => {
	const today = new Date();
	const eventDate = new Date(date);
	const timeDiff = Math.abs(eventDate.getTime() - today.getTime());
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return diffDays;
};
