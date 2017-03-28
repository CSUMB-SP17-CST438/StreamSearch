/**
 * i.e. `75` => `1 hour 15 minutes`
 * @param  {int} minutes number of minutes
 * @return {string}         hour + minutes
 */
export function convertMinutesToHoursString(minutes) {
	const abbreviation = true;
	minutes = Math.round(minutes);
	var hours = 0;
	while (minutes - 60 >= 0) {
		hours++;
		minutes-=60;
	}
	var content = '';
	if (hours == 0) {
		content = ``;
	} else if (hours == 1) {
		content = abbreviation ? `${hours} hr ` : `${hours} hour `;
	} else {
		content = abbreviation ? `${hours} hrs ` : `${hours} hours `;
	}

	if (minutes == 0) {
		content = content.slice(0, -1);
	} else if (minutes == 1) {
		content = abbreviation ? `${content}${minutes} min` : `${content}${minutes} minute`;
	} else {
		content = abbreviation ? `${content}${minutes} min` : `${content}${minutes} minutes`;
	}

	// for 0 time
	if (minutes == 0 && hours == 0) {
		content = `less than a minute`;
	}

	return content;
}