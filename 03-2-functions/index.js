/*
	1 Function scope
*/
//Carefully consider the scope of each of the variables
const apple = 'fuji';

function fruit(){
	const orange = 'navel';

	console.log(apple); //will this work? why?
};

console.log(apple); //will this work? why?
//console.log(orange); //will this work? why?

let b = 1;

function add(a){
	const temp = a + b;
	b += 1;	//b = b + 1;	//"side effect", it is suggested to avoid such side effect
	return temp;
}


/*
	2 "this" context of functions
*/
//2.1: a regular function
function foo(){
	console.log(this); //window object
}
foo();

//2.2: function attached to an object
const someObj = {
	prop1: 'some value',
	foo: function(){
		console.log(this);
	}
}
someObj.foo();

//2.3: a twist on 2.2
const bar = someObj.foo; //path a function to a variable
console.group('------2.3-----')
bar();		//return window object
console.groupEnd();

//2.4
//We can use function.prototype.bind to copy an existing function and arbitrarily assign its "this" context
const baz = someObj.foo.bind('I am some arbitrary string');//function.bind, bind the special value to this, here this is 'I am some arbitrary string'
baz();

//2.5
//One frequent use of "this" in relation to d3 is when we use the selection.each function
d3.select(document.querySelector('body'))
	.selectAll('span')
	.data(['a','b','c','d','e'])	//5 span elements now
	.enter()
	.append('span')

	.each(function(d,i){
		console.group('---2.5---');
		console.log(this); //what is "this"? the dom element which is add, the dom note include data {'string', index}
		console.log(d);
		console.log(i);
		console.groupEnd();

		d3.select(this)
			.style('background', 'blue')
			.style('width', '100px')
			.style('height', '100px')
			.style('display', 'block');

	});

//each iteration
/*selection.each(function(d,i){
	this ==> DOM element
	DOM --> selection
	d3.select(this) 
})
selection.call(function(x){
	//look at the API reference, call the function on the selection
	x == selection
});
*/

//2.6 
//Also beware of "this" context when using selection.on
d3.select(document.getElementById('dummy-button'))
	.on('click', function(d){
		console.group('---2.6---');
		console.log(this); //what is "this"? the dom element, the parent element
		console.log(d);
		console.groupEnd();

		//YOUR CODE HERE
		//How do you change the html content of the button to "I'm clicked?"
		d3.select(this).html('clicked ' + Math.random()); //seting the context of html
	});




/*
	3 Closure
	make the function modular, but also customizable
*/
const xSaysY = function(x){	//factory function: a function produce some functions, for example: SiqiSays(), AxxSays();

	let name = x;

	return function(msg){
		return `${name} says "${msg}"`;
	}
}

const simonSays = xSaysY('Simon');
console.log(simonSays); 
console.log(typeof simonSays);
console.log(simonSays('hello world'));
