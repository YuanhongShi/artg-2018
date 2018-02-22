import * as d3 from 'd3';
import Histogram from './Histogram';

import '../style/main.css';

function MainViz(_){

	const timeline = Histogram()
		.domain([new Date(2013,0,1), new Date(2013,11,31)])	//javascript month from 0 to 11
		.value(d => d.t0)
		.thresholds(d3.timeMonth.range(new Date(2013,0,1),new Date(2013,11,31),1))
		.tickXFormat(d => {
			return (new Date(d)).toUTCString();
		})
		.tickX(3)
		.tickY(2)
		.maxY(400);


	function exports(data,i){
		const width = this.clientWidth;
		const height = this.clientHeight;

		//data transfromation
		//nest by starting station
		const tripsByStation = d3.nest()
			.key(d=>d.station0)
			.entries(data)
			.map(d => {
				return d.values;
			});	//sort怎么做？

		console.log(tripsByStation);
		//Create a node for each station
		//call timeline module on each node
		const stationNodes = d3.select(this)
			.selectAll('.staion-node')
			.data(tripsByStation); //update selction of size 0 (initially)

		const stationNodesEnter = stationNodes.enter()
			.append('div')
			.classed('station-node', true)
			.style('width', '300px')
			.style('height', '180px')
			.style('float', 'left');
		stationNodes.exit().remove();

		stationNodesEnter.merge(stationNodes)
			.each(timeline);

	}

	return exports;
}

export default MainViz;