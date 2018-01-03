console.log('Week 1 Assignment 2: Data Import, Parse, and Discovery');

function parse(d){
	/**
	1.0 
	YOUR CODE HERE
	Complete the parse function to import the trips dataset with the appropriate types and property names
	Each trip should be represented as following
	{
		t0: "start_date" of type Date
		t1: "end_date" of type Date
		station0: "strt_statn" of type String
		station1: "end_statn" of type String
		duration: "duration" of type Number
		bike_nr: "bike_nr" of type String
		subsc_type: "subsc_type" of type String
	}
	**/
	return d; //MODIFY THIS
}

d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Now that the trips dataset has been imported and parsed, let's step through a series of exercises to familiarize ourselves with the data
	console.log(trips);

	/***
	2.0 Discovering min, max, mean, median
	
	2.1 What is the duration in seconds of the longest trip?
	Hint: use d3.max()
	YOUR CODE HERE:
	***/
	const longestDuration = undefined; //MODIFY THIS
	console.log(`Longest trip duration is ${longestDuration}`);

	/***
	2.2 What about the shortest trip?
	YOUR CODE HERE:
	***/
	const shortestDuration = undefined; //MODIFY THIS
	console.log(`Shortest trip duration is ${shortestDuration}`);

	/***
	2.3 Average and median trip duration?
	Please look at the definition of "mean" and "median" if you are not entirely sure of the difference
	YOUR CODE HERE:
	***/
	const meanDuration = undefined; //MODIFY THIS
	const medianDuration = undefined; //MODIFY THIS
	console.log(`Median duration is ${medianDuration} seconds; mean duration is ${meanDuration} seconds`);

	/***
	3.0 Filter, sort, map, slice
	
	3.1 Let's separate all the trips into those taken by registered vs casual users
	Hint: use Array.prototype.filter
	YOUR CODE HERE:
	***/
	const registeredTrips = trips.filter(/*MODIFY THIS*/);
	const casualTrips = trips.filter(/*MODIFY THIS*/);
	console.log(registeredTrips);
	console.log(casualTrips);
	console.log(registeredTrips === trips); //As you can see, Array.prototype.filter produces an entirely new array

	/**
	3.2 Sort registeredTrips by descending trip duration (i.e. longest trips first)
	Hint: use Array.prototype.sort
	YOUR CODE HERE:
	***/
	const sortedRegisteredTrips = registeredTrips.sort(/*MODIFY THIS*/);
	console.log(registeredTrips);
	console.log(sortedRegisteredTrips);
	console.log(registeredTrips === sortedRegisteredTrips);
	//Why are both arrays sorted?
	//As you can see, Array.prototype.sort does NOT produce a new array, but instead modifies the existing array in place

	/**
	3.3 Now that we've sorted registeredTrips, return two separate arrays that contain the top 10 longest and 10 shortest trips
	Hint: use Array.prototype.slice
	YOUR CODE HERE:
	***/
	const top10RegisteredTrips = registeredTrips.slice();
	const bottom10RegisteredTrips = registeredTrips.slice();
	console.log(top10RegisteredTrips);
	console.log(bottom10RegisteredTrips);
	/**
	3.3.1 Without reading documentation, how could you ascertain if Array.prototype.slice behaves more like filter or sort?
	Does Array.prototype.slice create a new array, or modify existing arrays in place?
	YOUR CODE HERE:
	***/

	/**
	3.4 Instead of an array of trips, generate a completely new array of departure timestamps (i.e. t0)
	Hint: use Array.prototype.map
	Again, does Array.prototype.map create a new array, or modify existing arrays in place?
	YOUR CODE HERE:
	***/
	const departureTimestamps = trips.map(/*MODIFY THIS*/);
	console.log(departureTimestamps);

	/***
	4.0 Nest
	
	4.1 Create a nested array, where trips are nested by departure station (i.e. station0)
	YOUR CODE HERE:
	***/

	/***
	4.2 Further "collapse" this array, so that for each departure stations, we have the number of trips departing from each
	Hint: there are multiple ways of doing this, including using d3.nest.rollup, but attempt this with what we've learned in this assignment
	YOUR CODE HERE:
	***/

	/***
	5.0 BONUS Question
	Can you answer 2.1 and 2.2 without using d3's built-in max and min methods?
	Hint: Javascript has a built-in Math.max(...) function
	YOUR CODE HERE:
	***/

	
});