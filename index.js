const createDayLables = dayNum => {
	switch (dayNum) {
		case 0:
			day = 'Sunday';
			break;
		case 1:
			day = 'Monday';
			break;
		case 2:
			day = 'Tuesday';
			break;
		case 3:
			day = 'Wednesday';
			break;
		case 4:
			day = 'Thursday';
			break;
		case 5:
			day = 'Friday';
			break;
		case 6:
			day = 'Saturday';
	}
	return day;
};
const calculateDay = date => {
	let dayNum = new Date([...date.slice(0, 6), ...'1962'].join('')).getDay();
	let day = createDayLables(dayNum);
	return day;
};
const calculateInitials = name => {
	let initials = name
		.split(' ')
		.map(cur => cur.split('')[0])
		.join('');
	return initials;
};
const calculateBorn = (data, year) => {
	let born = data.filter(current => {
		return parseInt(current.birthday.slice(6)) <= parseInt(year);
	});
	return born;
};
const calculateRenderData = data => {
	let renderData = data.map(current => {
		let initials = calculateInitials(current.name);
		let day = calculateDay(current.birthday);
		return { initials, day, birthday: current.birthday };
	});
	return renderData;
};
const getAllInitialsOfDay = (arr, day) => {
	const toBeSorted = arr
		.filter(cur => cur.day === day)
		.map(cur => {
			return { initials: cur.initials, birthday: cur.birthday };
		});
	return dateWiseSort(toBeSorted);
};
const claculateDayWiseInitials = data => {
	const sun = getAllInitialsOfDay(data, 'Sunday');
	const mon = getAllInitialsOfDay(data, 'Monday');
	const tue = getAllInitialsOfDay(data, 'Tuesday');
	const wed = getAllInitialsOfDay(data, 'Wednesday');
	const thu = getAllInitialsOfDay(data, 'Thursday');
	const fri = getAllInitialsOfDay(data, 'Friday');
	const sat = getAllInitialsOfDay(data, 'Saturday');
	return [
		{
			day: 'Sunday',
			initials: sun,
		},
		{
			day: 'Monday',
			initials: mon,
		},
		{
			day: 'Tuesday',
			initials: tue,
		},
		{
			day: 'Wednesday',
			initials: wed,
		},
		{
			day: 'Thursday',
			initials: thu,
		},
		{
			day: 'Friday',
			initials: fri,
		},
		{
			day: 'Saturday',
			initials: sat,
		},
	];
};
const dateWiseSort = data => {
	const sorteddata = data.sort((a, b) => {
		return new Date(b.birthday) - new Date(a.birthday);
	});
	return sorteddata;
};
const addClass = (arr, className) => {
	let calContent = document.querySelector(`.${className}`);
	let cardInit = document.querySelector('.card-init');
	console.log(cardInit, 'cardInit');
	if (arr.length === 1) {
		calContent.classList.add('cal-content1');
	} else if (arr.length > 1 && arr.length > 5) {
		calContent.classList.add('cal-content2');
	} else {
		calContent.classList.add('cal-content3');
	}
};
const renderResults = () => {
	// document.querySelector('.sunday').innerHTML = '';
	// document.querySelector('.monday').innerHTML = '';
	// document.querySelector('.tuesday').innerHTML = '';
	// document.querySelector('.wednesday').innerHTML = '';
	// document.querySelector('.thrusday').innerHTML = '';
	// document.querySelector('.friday').innerHTML = '';
	// document.querySelector('.saturday').innerHTML = '';
	let data = [];
	let year = '';
	let born = [];
	let renderData = [];
	data = JSON.parse(document.querySelector('#text-area').value);
	year = document.querySelector('#year').value;
	if (data.length) {
		born = calculateBorn(data, year);
	}
	renderData = calculateRenderData(born);
	const calConfigData = claculateDayWiseInitials(renderData);

	const sunday = calConfigData[0].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);
	const monday = calConfigData[1].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);
	const tuesday = calConfigData[2].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);
	const wenesday = calConfigData[3].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);
	const thursday = calConfigData[4].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);
	const friday = calConfigData[5].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);
	const saturday = calConfigData[6].initials.map(cur => `<div class="card-init">${cur.initials}</div>`);

	document.querySelector('.sunday').innerHTML = sunday.join('');
	document.querySelector('.monday').innerHTML = monday.join('');
	document.querySelector('.tuesday').innerHTML = tuesday.join('');
	document.querySelector('.wednesday').innerHTML = wenesday.join('');
	document.querySelector('.thrusday').innerHTML = thursday.join('');
	document.querySelector('.friday').innerHTML = friday.join('');
	document.querySelector('.saturday').innerHTML = saturday.join('');
};
document.querySelector('#update-button').addEventListener('click', renderResults);
