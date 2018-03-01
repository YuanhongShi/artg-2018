import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse, parse2, parseStation, fetchCsv} from './utils';

//Import modules
import Histogram from './components/Histogram';
import MainViz from './components/mainViz';
import Animation from './components/Animation';

//Histogram
//factory
const timeline = Histogram()
	.domain([new Date(2013,0,1), new Date(2013,11,31)])
	.value(d => d.t0)
	.thresholds(d3.timeMonth.range(new Date(2013,0,1), new Date(2013,11,31), 1))
	.tickXFormat(d => {
		return (new Date(d)).toUTCString();
	})
	.tickX(2);

const activityHistogram = Histogram()
	.thresholds(d3.range(0,24,.5))
	.domain([0,24])
	.value(d => d.time_of_day0)
	.tickXFormat(d => {
		const time = +d;
		const hour = Math.floor(time);
		let min = Math.round((time-hour)*60);
		min = String(min).length === 1? "0"+ min : min;
		return `${hour}:${min}`
	})
	.maxY(1000);

const mainViz = MainViz(); //a closure
const animation = Animation(
	document.querySelector('.main')	//DOM Node of <div class = "main">
	); 
/*
fetchCsv('./data/hubway_trips_reduced.csv', parse)	//this is a Promise, and it will give you the data in hubway_trips_reduced.csv
	.then((resolvedValue)=>{
		console.log(resolvedValue);
	})

fetchCsv('./data/hubway_stations.csv', parseStation)
	.then((resolvedValue)=>{
		console.log(resolvedValue);
	})
*/

//Import data using the Promise interface
Promise.all([								//Promise.race VS Promise.all
	//Promise.all相当于等待所有的promise都处理好再做别的事情
		fetchCsv('./data/hubway_trips_reduced.csv', parse),
		fetchCsv('./data/hubway_stations.csv', parseStation)
	]).then(([trips, stations]) => {

		d3.select('#time-of-the-day-main')
			.datum(trips)
			.each(activityHistogram);

		d3.select('#timeline-main')
			.datum(trips)
			.each(timeline);

		//We will not draw mainViz for now

		animation(trips, stations);



	});