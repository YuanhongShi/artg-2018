# Week 3 Assignment 2 - Implementing Reusability: First Attempt

<<<<<<< HEAD
In Assignment 1, we tried to capture all of the logic for creating an activity histogram into a function. In this assignment, that function, `activityHistogram`, has been moved into its own module in `/src/activityHistogram.js`.

![small multiples](./small-multiples.jpg?raw=true "small multiples")

With this reusable module/function, we are able to easily create "small multiples" of the activity histogram, one for each station.

While mostly similar to what we tried to do in Assignment 1, this `activityHistogram` module differs in several regards. **The code for it is complete; your job is to carefully parse through this code and make sure you understand how it works.** Please bring your questions to class on Friday.
=======
In class this week, we created an activity timeline of hubway trips across the system. This was a useful review of d3's data transformation (layout) and shape generator pipeline.

What if we wanted to implement small multiples of this activity timeline, one for each station?
>>>>>>> siqi/dev

## To start the project
Navigate to `/03-assignment-2` folder, then run:
```
npm start
```

## In `index.js`
<<<<<<< HEAD
To create small multiples, we first have to create 1) the correct data structure and 2) `<div>` containers. Lines 12-30 does that, using `nest` and the enter-exit-update pattern.

**What is passed into `activityHistogram` function as arguments?**

## In `activityHistogram.js`

### Building DOM scaffolding
Because we can't append `:svg` elements directly to `<div>`, we first have to create the right DOM scaffolding i.e. an `<svg>` element. Lines 6-22 does that. Two questions you should clarify to yourself: what is `this` in the context of this function? And also, what's the point of lines 12-14?

```js
const svg = d3.select(this)
	.selectAll('svg')
	.data([1]); //particularly this line?
```

=======
There is already a `<div>` element created for each station, using the enter-exit-update pattern. Inspect each element of the data that is bound to each element. Does it make sense?

## In `timeline.js`
Here, the `timeline` function takes an array of trips data, and creates an acitivty timeline visualization. However, this function is not resuable. For one thing, it will only create this visualization on the `<div id="timeline-multiple">` element. Also, it will not update the visualization if called again with a different array of trips data.

Your job is to refractor the `timeline` function to make it reusable, so that 1) you can use it create small multiples of activity timelines for each station, and 2) it can be used to update these timelines on data change.

Accomplishing 2) will require some nuanced thinking. Remember that to update the visualization, we will be calling `timeline` over and over again. Take a look, for example, at lines 10 and 14. How many `<svg>` and `<g>` elements will we end up appending? How can we fix this? Take a crack at the problem and we'll discuss solutions to this in class.
>>>>>>> siqi/dev
