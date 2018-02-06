import * as d3 from 'd3';
import './style.css';

import parse from './parse';

console.log('Week 3 assignment 1: writing a reusable activity histogram');

//Set up DOM scaffolding
const width = d3.select('#activity-histogram').node().clientWidth;
const height = d3.select('#activity-histogram').node().clientHeight;
const margin = {t:20,r:100,b:20,l:100};
const w = width - margin.l - margin.r;
const h = height - margin.t - margin.b;
const plot = d3.select('#activity-histogram')
	.append('svg')
	.attr('width',width)
	.attr('height',height)
	.append('g')
	.attr('class','acitivity-histogram-inner')
	.attr('transform',`translate(${margin.l},${margin.t})`);

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Bind selection to the entire array of trips, one to one
	plot
		.datum(trips) //note: .datum(), not .data()
		.each(activityHistogram);

});

function activityHistogram(data){

	//Transform data
	//Group trips into discrete 15 minute bins, using the d3.histogram layout
	const histogram = d3.histogram()
		.value(d => d.time_of_day0)
		.thresholds(d3.range(0,24,.25));

	//debug information for the function
	console.log(data);
	console.log(typeof histogram);
	console.log(data);	//the input data has been changed after histogram function
	//end of the debug information 

	const tripsByQuarterHour = histogram(data)
		.map(d => {
			return {
				x0:d.x0, //left bound of the bin; 18.25 => 18:15
				x1:d.x1,
				volume:d.length
			}
		});
	console.log(tripsByQuarterHour);

	//Set up scales in the x and y direction
	const scaleX = d3.scaleLinear().domain([0,24]).range([0,w]);
	const maxVolume = d3.max(tripsByQuarterHour, d => d.volume);
	const scaleY = d3.scaleLinear().domain([0,maxVolume]).range([h,0]);

	//Set up axis generator
	const axisY = d3.axisLeft()
		.scale(scaleY)
		.tickSize(-w); //check the meaning!!!!!!

	const axisX = d3.axisBottom()
		.scale(scaleX) //check the scale() function
		.tickFormat(d => {	//format each of the tick
			const time = +d; 
			const hour = Math.floor(time);
			let min = Math.round((time-hour)*60);
			min = String(min).length === 1? "0"+ min : min;
			return `${hour}:${min}`
		});

	//Draw
	/*** YOUR CODE HERE ***/
	 // bar
	 /* code of the professor

	const rootElement = this; //<g.activity-hisgram-inner>
	const binsUpdate = d3.select(this)
		.selectAll('.bin')	//selection of 0 elements
		.data(tripsByQuarterHour);	//array of 96 bins
		//enter set of 96
		//exit set of 0
	const binsEnter = binsUpdate.enter()
		.append('rect')
		.attr('class', 'bin')
		.attr('x', d => scaleX(d.x0))
		.attr('width')
		.attr('y', h)
		.attr('height', 0);	//set the inition position of the bars

	binsEnter.merge(binsUpdate)
		.transition()
		.duration(2000)
		.attr('x', d => scaleX(d.x0))
		.attr('width')
		.attr('y', d => scaleY(d.volume))
		.attr('height', d => { return h - scaleY(d.volume);)
		.style('fill', 'rgb(180,180,180)');

	//Exit
	binsUpdate.exit(),remove();


	 */
 const barXNode = d3.select(this)
  .selectAll('rect')
  .data(tripsByQuarterHour);
 const barXNodeEnter = barXNode.enter()
  .append('rect')
  .attr('class', 'bar')
  .attr("x", 1);
 barXNode.merge(barXNodeEnter)
  .attr('transform', d => { return `translate(${scaleX(d.x0)}, ${scaleY(d.volume)})`; })
   .attr("width", d => { return scaleX(d.x1) - scaleX(d.x0) -1; })
   .attr("height", d => { return h - scaleY(d.volume); });

	/*** YOUR CODE HERE ***/

	//Axis
	const axisXNode = d3.select(this)
		.selectAll('.axis-x')
		.data([1]);	//data array of 1 element //make sure there is only one element 
		//enter set will be size 1
		//exit 0
		//update 0

	const axisXNodeEnter = axisXNode.enter()
		.append('g')
		.attr('class','axis-x');
		//<g. axis-x>
	axisXNode.merge(axisXNodeEnter)
		.attr('transform',`translate(0,${h})`)
		.call(axisX);
		//draw the axis on <g.axis-x>

	const axisYNode = d3.select(this)
		.selectAll('.axis-y')
		.data([1]);
	const axisYNodeEnter = axisYNode.enter()
		.append('g')
		.attr('class','axis-y');
	axisYNode.merge(axisYNodeEnter)
		.call(axisY);

	axisYNodeEnter.select('.domain').style('display','none');
	axisYNodeEnter.selectAll('line')
		.style('stroke','rgb(80,80,80)')
		.style('stroke-dasharray','2px 2px');

}