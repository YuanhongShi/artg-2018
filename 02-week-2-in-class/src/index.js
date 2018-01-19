import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';

console.log('Week 2 in class....');

console.log('something');





//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Data transformation, discovery, and mining
	console.log(trips);
	//console.log(typeof trips);
	const tripsByStation0 = d3.nest()		//nest function is trying to group the data
		.key(function(d){return d.station0; })
		.entries(trips);


	const tripVolumeBystation0 = tripsByStation0.map(function(d){

		return {
			station: d.key,
			volume: d.values.length

		};

	});


	console.log(tripVolumeBystation0);
	//Mine for maximum
	const maxVolume = d3.max(tripVolumeBystation0,function(d){
		return d.volume;
	});
	console.log(maxVolume);



	//visual space measurements
	const margin = {t:100, r:300, b:100, l:300};
	const padding = 3;
	const w = d3.select('.module').node().clientWidth;
	const h = d3.select('.module').node().clientHeight;
	const _w = w - margin.l - margin.r;
	const _h = h - margin.t - margin.b;



	//scale
	const scaleX = d3.scaleLinear().domain(0, maxVolume).range(0, _w);

	//Represent / DOM manipulation
	const svgNode = d3.select('.module')
		.append('svg')
		.attr('width', w)
		.attr('height', h);	//selection

	const plot = svgNode
		.append('g')
		.attr('class', 'chart')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);

	console.log(plot.node());

	const stationNodes = plot.selectAll('.station')	//select 0 elements
		.data(tripVolumeBystation0)
		.enter()	//special selection, of deficit between DOM and data points in the array, size in this case is 142
		.append('g')
		.attr('class', 'station')	//selection of <g.station> x 142
		.attr('transform', function(d, i){
			return `translate(0, ${i*_h/tripVolumeBystation0.length})`
		});

	stationNodes
		.append('rect')	//append change the selection target
		.attr('width', function(d){
			//console.log(scaleX(d.volume));
			return scaleX(d.volume);
		})
		.attr('height', _h/tripVolumeBystation0.length - padding)
		.style('fill', 'red');

	console.log('hererere!!!');

	stationNodes
		.append('text')
		.text(function(d){
			return d.station;
		})
		.attr('text-anchor', 'end')
		.style('font-size', '6px');


});

