import * as d3 from 'd3';

function Animation(_){

	let _w;
	let _h;
	let _t;		//current time in the animation

	const projection = d3.geoMercator()//Mercator is the map projector google map used now
		.scale(360000)
		.center([-71.081543, 42.34560]);

	const scaleSize = d3.scaleSqrt()
		.domain([0,3000])
		.range([3,20]);

	//
	let tripsData;
	let stationData;
	let locationLookup;

	let ctx;

	function exports(trips, stations){
	//DOM element === _ ===> document.querySelector('.main') -> see the argument in index.js

		_w = _.clientWidth;
		_h = _.clientHeight; 

		projection.translate([_w/2, _h/2]);
		//Data transformation
		tripsData = trips;
		stationData = stations.map(stn => {
			const [x,y] = projection([stn.lng, stn.lat]);
			return {
				x:x,
				y:y,
				...stn //把stn的结构deconstruct, 并组成新的object结构
			}
		});

		locationLookup = d3.map(stationData, d => d.id_short);

		//Append DOM element
		const root = d3.select(_);

  let svg = root
	   .selectAll('.animation-layer-svg')
	   .data([1]);
  svg = svg.enter().append('svg')
	   .attr('class', 'animation-layer-svg')
	   .merge(svg)
	   .attr('width', _w)
	   .attr('height', _h)
	   .style('position', 'absolute')
	   .style('top', 0)
	   .style('left', 0);

		let canvas = root
   		.selectAll('.animation-layer-canvas')
   		.data([1]);
  canvas = canvas.enter().append('canvas')
   		.attr('class', 'animation-layer-canvas')
  		.merge(canvas)
   		.attr('width', _w)
   		.attr('height', _h)
   		.style('position', 'absolute')
   		.style('top', 0)
   		.style('left', 0);	//canvas is the selection of the canvas

   	ctx = canvas.node().getContext('2d');

		//Draw the stations to <svg>
		const stationsNodes = svg.selectAll('.station')
			.data(stationData, d => d.id_short);
		const stationsEnter = stationsNodes.enter()
			.append('g')
			.attr('class', 'station')
		stationsEnter.append('circle').attr('r', 20).style('fill','none').style('stroke', 'rgba(255,255,255,.3)').style('stroke-width',1);
		stationsEnter.append('text').text(d => d.id_short).style('font-size', '8');

		stationsEnter
			.merge(stationsNodes)
			.attr('transform', d => `translate(${d.x}, ${d.y})`);


		_t = d3.min(trips, d => d.t0); 	//Data object

		renderFrame();


	}

	function renderFrame(){
		//called approx. 60 times per sec
		//console.log(_t);

		//Clear the frame
		ctx.clearRect(0,0,_w,_h);

		const bikePath2D = new Path2D();
		const linePath2D = new Path2D();

		//We draw all the trips in progress at give point in time_t
		tripsData.forEach(trip => {

			const {t0,t1,station0,station1} = trip;	//destructuring data set
			//calculate % completion
			const pct = (_t.valueOf() - t0.valueOf())/(t1.valueOf() - t0.valueOf());	
			if (pct < 0 || pct > 1) return;

			//trips in progress
			const stn0 = locationLookup.get(station0); // part of d3.map() API
			const stn1 = locationLookup.get(station1);
			if(!stn0 || !stn1) return;

			const x0 = stn0.x, y0 = stn0.y, x1 = stn1.x, y1 = stn1.y;

			const x = (1-pct)*x0 + pct*x1;
			const y = (1-pct)*y0 + pct*y1;

			bikePath2D.moveTo(x,y);
			bikePath2D.arc(x,y,5,0,Math.PI*2);

			linePath2D.moveTo(x0,y0);
			linePath2D.lineTo(x1,y1);

		})

		ctx.fillStyle = 'rgb(255,255,0)';
		ctx.fill(bikePath2D);
		ctx.strokeStyle = 'rgb(255,255,255)';
		ctx.stroke(linePath2D);

		//Increment _t up by a certain amount
		//call the next animation frame
		_t = new Date(_t.valueOf() + 18000);
		requestAnimationFrame(renderFrame);

	}

	return exports;

}

export default Animation;
