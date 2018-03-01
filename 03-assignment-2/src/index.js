import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';
import activityHistogram from './activityHistogram';

<<<<<<< HEAD
/* "data" -->
{
	key: "47",
	values:[
	{trip},
	{trip},
	{trip}

	]
}
*/

=======
>>>>>>> siqi/dev
console.log('Week 3 assignment 2');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Nest trips by origin station
	const tripsByStation0 = d3.nest()
<<<<<<< HEAD
		//.key(function(d){return d.station0})
		.key(d => d.station0)
		.entries(trips);

	console.log(trips);
	console.log('Data nested!')
	console.log(tripsByStation0);

	const stationNodes = d3.select('#timeline-multiple')
		.selectAll('.station-node') //selection of size 0 -> 2nd time: selection of update size 142
		.data(tripsByStation0, d => d.key); //array size 142
	const stationNodesEnter = stationNodes.enter() //enter selection of size 142 -> 2nd time: enter size of 0
		.append('div')
		.attr('class', 'station-node')
		.style('width','300px')
		.style('height','180px')
		.style('float','left');
	stationNodes.exit().remove();
	stationNodes.merge(stationNodesEnter)//update + enter: size of 142
		.each(activityHistogram); //What arguments are we passing to activityHistogram?
=======
		.key(function(d){ return d.station0 })
		.entries(trips);

	const stationNodes = d3.select('#timeline-multiple')
		.selectAll('.station-node')
		.data(tripsByStation0);
	const stationNodesEnter = stationNodes.enter()
		.append('div')
		.style('width','300px')
		.style('height','180px')
		.style('float','left');
	stationNodes.merge(stationNodesEnter)
		.each(activityHistogram);
>>>>>>> siqi/dev

});