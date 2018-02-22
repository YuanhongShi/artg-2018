import * as d3 from 'd3';
import '../style/histogram.css';

<<<<<<< HEAD


function Histogram(_){
	//factory function
	let _thresholds;
	let _domain;
	let _value = () => {}; //function
	let _tickY = 5;
	let _tickX = 6;
	let _tickXFormat = d => d; //function 
	let _maxY = -Infinity;

	function exports(data,i){
		const root = this;	//div element
=======
function Histogram(_){
	//factory function

	let _thresholds;
	let _domain;
	let _value = () => {}; //function
	let _tickX = 6;
	let _tickY = 5;
	let _tickXFormat = d => d;
	let _maxY = -Infinity;

	function exports(data,i){
		const root = this;
>>>>>>> siqi/master

		const width = root.clientWidth; 
		const height = root.clientHeight;
		const margin = {t:20,r:20,b:20,l:30};
		const w = width - margin.l - margin.r;
		const h = height - margin.t - margin.b;

		const svg = d3.select(root)
<<<<<<< HEAD
			.classed('histogram',true)	//不会覆盖之前定义的class
=======
			.classed('histogram',true)
>>>>>>> siqi/master
			.selectAll('svg')
			.data([1]); //What's going on here?
		const svgEnter = svg.enter().append('svg')
			.attr('width',width)
			.attr('height',height);
		svgEnter.append('g').attr('class','plot')

		const plot = svg.merge(svgEnter)
			.select('.plot')
			.attr('transform',`translate(${margin.l},${margin.t})`);

		//Transform data
		//Group trips into discrete 15 minute bins, using the d3.histogram layout
		const histogram = d3.histogram()
			.value(_value)
<<<<<<< HEAD
			.thresholds(_thresholds)	//specify the domain is a little bit sensitive
=======
			.thresholds(_thresholds)
>>>>>>> siqi/master
			.domain(_domain);
		const tripsByQuarterHour = histogram(data)
			.map(d => {
				return {
					x0:d.x0, //left bound of the bin; 18.25 => 18:15
					x1:d.x1,
<<<<<<< HEAD
					volume:d.length	//just change the name of the data, not change the structure of data, just make it more readable
=======
					volume:d.length
>>>>>>> siqi/master
				}
			});

		//Set up scales in the x and y direction
		const scaleX = d3.scaleLinear().domain(_domain).range([0,w]);
		const maxVolume = d3.max(tripsByQuarterHour, d => d.volume);
<<<<<<< HEAD
		const scaleY = d3.scaleLinear().domain([0,Math.max(_maxY, maxVolume)]).range([h,0]);
=======
		const scaleY = d3.scaleLinear().domain([0, Math.max(_maxY,maxVolume)]).range([h,0]);
>>>>>>> siqi/master

		//Set up axis generator
		const axisY = d3.axisLeft()
			.scale(scaleY)
<<<<<<< HEAD
			.tickSize(-w)	//定义这个dash line的方向的
			.ticks(_tickY);	
=======
			.tickSize(-w)
			.ticks(_tickY);
>>>>>>> siqi/master

		const axisX = d3.axisBottom()
			.scale(scaleX)
			.ticks(_tickX)
			.tickFormat(_tickXFormat);

		//Draw
		//Bars
		//Update
		const binsUpdate = plot
			.selectAll('.bin')
			.data(tripsByQuarterHour);

		//Enter
		const binsEnter = binsUpdate.enter()
			.append('rect')
			.attr('class','bin') //If you forget this, what will happen if we re-run this the activityHistogram function?
			.attr('x', d => scaleX(d.x0))
			.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)))
			.attr('y', d => h)
			.attr('height', 0);

		//Enter + update
		binsEnter.merge(binsUpdate)
			.transition()
			.duration(500)
			.attr('x', d => scaleX(d.x0))
			.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)))
			.attr('y', d => scaleY(d.volume))
			.attr('height', d => (h - scaleY(d.volume)))
			.style('fill','rgba(0,0,0,.1)');

		//Exit
		binsUpdate.exit().remove();

		//Axis
		const axisXNode = plot
			.selectAll('.axis-x')
			.data([1]);
		const axisXNodeEnter = axisXNode.enter()
			.append('g')
			.attr('class','axis axis-x');
		axisXNode.merge(axisXNodeEnter)
			.attr('transform',`translate(0,${h})`)
			.call(axisX);

		const axisYNode = plot
			.selectAll('.axis-y')
			.data([1]);
		const axisYNodeEnter = axisYNode.enter()
			.append('g')
			.attr('class','axis axis-y');
		axisYNode.merge(axisYNodeEnter)
			.call(axisY);
	}

<<<<<<< HEAD
	exports.thresholds = function(_){
		//_ is an array of thresholds
		if(typeof _ === 'undefine') return _thresholds;
		_thresholds = _;
		return this;		
		//为什么没有return还是能工作？return this是为了在index.js里直接用
		/*
		activityHistogram
		.thresholds(d3.range(0,24,.25))
		.domain([9,21]);
		*/
		//这个格式，因为每次call这个setting, getting function后返回的还是一个function，才能继续custom这个设置
	}

	exports.domain = function(_){
		if(typeof _ === 'undefine') return _domain;
=======
	//Getter/setter
	exports.thresholds = function(_){
		//_ is an array of thresholds
		if(typeof _ === 'undefined') return _thresholds;
		_thresholds = _;
		return this;
	}

	exports.domain = function(_){
		if(typeof _ == 'undefined') return _domain;
>>>>>>> siqi/master
		_domain = _;
		return this;
	}

<<<<<<< HEAD
	exports.value = function(fn){	//argument of fn is setting to be readable for other people
		if(typeof fn === 'undefine') return _value;
=======
	exports.value = function(fn){
		if(typeof fn ==='undefined') return _value;
>>>>>>> siqi/master
		_value = fn;
		return this;
	}

	exports.tickX = function(_){
<<<<<<< HEAD
		if(typeof _ === 'undefine') return _tickX;
=======
		if(typeof _ ==='undefined') return _tickX;
>>>>>>> siqi/master
		_tickX = _;
		return this;
	}

	exports.tickY = function(_){
<<<<<<< HEAD
		if(typeof _ === 'undefine') return _tickY;
=======
		if(typeof _ ==='undefined') return _tickY;
>>>>>>> siqi/master
		_tickY = _;
		return this;
	}

	exports.tickXFormat = function(fn){
<<<<<<< HEAD
		if(typeof fn === 'undefine') return _tickXFormat;
=======
		if(typeof fn ==='undefined') return _tickXFormat;
>>>>>>> siqi/master
		_tickXFormat = fn;
		return this;
	}

	exports.margin = function(_){

	}

	exports.maxY = function(_){
<<<<<<< HEAD
		if(typeof _ === 'undefine') return _maxY;
=======
		if(typeof _ === 'undefined') return _maxY;
>>>>>>> siqi/master
		_maxY = _;
		return this;
	}

	return exports;
}

export default Histogram;