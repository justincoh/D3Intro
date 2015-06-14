var	data = [
	{ time:0, skills:0, frustration:0},
	{ time:1, skills:0, frustration:1000},
	{ time:2, skills:2, frustration:5000},
	{ time:3, skills:4, frustration:9000},
	{ time:4, skills:6, frustration:7000},
	{ time:5, skills:18, frustration:5000},
	{ time:6, skills:16, frustration:3000},
	{ time:7, skills:35, frustration:1000},
	{ time:8, skills:60, frustration:500},
	{ time:9, skills:81, frustration:1000},
	{ time:10, skills:100, frustration:2000},
];

var width = 800,
	height = 600;

//Create the SVG 
var svg = d3.select('.chart').append('svg')
	.attr('width', width)
	.attr('height', height)
	.style('border','1px solid grey')
	.style('overflow','visible')

//Touch on max/min, use extent

//Build x Axis
var xDomain = d3.extent(data, function(d){
	return d.time;
});

var x = d3.scale.linear()
	.domain(xDomain)
	.range([0,width]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

//Draw x axis
svg.append('g')
	.attr('class','x axis')
	.attr('transform','translate(0,'+height+')')
	.call(xAxis)
	.append('text')
	.attr('x',width/2.5)
	.attr('y',35)
	.text('Time Spent')


//Build Y Axis
var yDomain = d3.extent(data, function(d){
	return d.skills;
});

var y = d3.scale.linear()
	.domain(yDomain)
	.range([height,0]);	//backwards because of svg coordinates

var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

//Draw Y Axis
svg.append('g')
	.call(yAxis)
	.append('text')
	.attr('transform','rotate(-90)')
	.style('text-anchor','end')
	.attr('x',-height/2.4)
	.attr('y',-35)
	.text('Skills')



// //For slides
// //straight from source
// scale.domain = function(x) {
// 	if (!arguments.length) return domain;
// 	domain = x.map(Number);
// 	return rescale();
// };