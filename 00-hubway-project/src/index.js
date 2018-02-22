import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
<<<<<<< HEAD
import {parse, parse2} from './utils';	//syntax of import of different types of export

//Import modules
import Histogram from './components/Histogram';
//Histogram is the factory function
import MainViz from './components/mainViz';

const timeline = Histogram()
	.domain([new Date(2013,0,1), new Date(2017,11,31)])	//javascript month from 0 to 11
	.value(d => d.t0)
	.thresholds(d3.timeMonth.range(new Date(2013,0,1),new Date(2017,11,31),1))
=======
import {parse, parse2} from './utils';

//Import modules
import Histogram from './components/Histogram';
import MainViz from './components/mainViz';

//Histogram
//factory
const timeline = Histogram()
	.domain([new Date(2013,0,1), new Date(2013,11,31)])
	.value(d => d.t0)
	.thresholds(d3.timeMonth.range(new Date(2013,0,1), new Date(2013,11,31), 1))
>>>>>>> siqi/master
	.tickXFormat(d => {
		return (new Date(d)).toUTCString();
	})
	.tickX(2);

<<<<<<< HEAD


const activityHistogram = Histogram();
activityHistogram
	.thresholds(d3.range(0,24,.25))
	.domain([0,24])
	.value(d=>d.time_of_day0)	//只是一个定义函数的格式，并没有call它，真正在用的时候才call到data
	.tickXFormat(d => {
				const time = +d;
				const hour = Math.floor(time);
				let min = Math.round((time-hour)*60);
				min = String(min).length === 1? "0"+ min : min;
				return `${hour}:${min}`
		})
	.maxY(1000);	
	
const mainViz = MainViz();	//closure
=======
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
>>>>>>> siqi/master

d3.csv('./data/hubway_trips_reduced.csv', parse, (err,trips) => {

	d3.select('#time-of-the-day-main')
		.datum(trips)
		.each(activityHistogram);

	d3.select('#timeline-main')
		.datum(trips)
		.each(timeline);

	d3.select('.main')
		.datum(trips)
		.each(mainViz);

<<<<<<< HEAD




=======
>>>>>>> siqi/master
});