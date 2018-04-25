import {select,path,event,mouse,dispatch} from 'd3';
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h);

//Draw shapes
const circle = plot.append('g')
	.attr('transform',`translate(${w/4},${h/2})`)
	.append('circle')
	.attr('r',w/16);
const square = plot.append('g')
	.attr('transform',`translate(${w/4*2},${h/2})`)
	.append('rect')
	.attr('x',-w/16)
	.attr('y',-w/16)
	.attr('width',w/8)
	.attr('height',w/8);
const triangle = plot.append('g')
	.attr('transform',`translate(${w/4*3},${h/2})`)
	.append('path');
const pathData = path();//path() == d3.path(), 因为开头import path from d3
pathData.moveTo(0,-w/16);
pathData.lineTo(w/16,w/16);
pathData.lineTo(-w/16,w/16);
pathData.lineTo(0,-w/16);
triangle.attr('d',pathData.toString());
/*
//Basic d3 event API
//selection.on(eventType, callback)
circle.on('click',function(d,i){
	console.log(d);
	console.log(this);//the vaule of this will be different from using function(d){} rather than =>
					//=> will not creat its own "this" value
	console.log(event);	//d3.event
	console.log(mouse(this));
});

square
	.on('mouseenter',function(d){
		console.log(this);
	})
	.on('mouseleave', d => {//=> different from function(d){}
		console.log(this);
	});

//On mouseenter
//Turn circle red
circle
	.on('mouseenter',function(d){
		select(this).transition().style('fill', 'red');
		square.transition().style('fill', 'red');
		triangle.transition().style('fill', 'red');
	})
	.on('mouseleave',function(d){
		select(this).transition().style('fill', 'black');
		square.transition().style('fill', 'black');
		triangle.transition().style('fill', 'black');
	
	})
	


//Turn square green
square
	.on('mouseenter.foo',function(d){	//d3 treats mouseenter and mouseenter.foo as two different events
		select(this).style('fill', 'green');
	})
	.on('mouseleave',function(d){
		select(this).style('fill', 'black');	//select(this).on('mouseenter.foo', null);居然还有这种操作
	});

//square
//	.on('.foo', null);//only remove the mouseenter.foo event


//Turn triangle blue

triangle
	.on('mouseenter',function(d){
		select(this).transition().style('fill', 'blue');
	})
	.on('mouseleave',function(d){
		select(this).transition().style('fill', 'black');
	})
*/
//How do we make these three elements interact among themselves?
//d3.dispatch//factory
//dispatcher //instance

const dispatcher = dispatch('element:changeColor', );

circle
	.on('mouseenter', () => { dispatcher.call('element:changeColor','I am the context','red');})
	.on('mouseleave', () => { dispatcher.call('element:changeColor',null, 'black');})
square
	.on('mouseenter', () => { dispatcher.call('element:changeColor',null,'green');})
	.on('mouseleave', () => { dispatcher.call('element:changeColor',null, 'black');})
triangle
	.on('mouseenter', () => { dispatcher.call('element:changeColor',null,'blue');})
	.on('mouseleave', () => { dispatcher.call('element:changeColor',null, 'black');})

//dispatch broadcasts event back out to all the subscribers
dispatcher.on('element:changeColor',function(arg){
	console.log(this);
	triangle.transition().style('fill', arg);
	square.transition().style('fill', arg);
	circle.transition().style('fill', arg);
});

