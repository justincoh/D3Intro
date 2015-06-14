var width = 800,
    height = 600;

//create the svg
var svg = d3.select('.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('overflow', 'visible');

//domains for scale functions
var xDomain = d3.extent(data, function(d) {
    return d.time;
});

var yDomain = d3.extent(data, function(d) {
    return d.skills;
});

//Build x Axis
var x = d3.scale.linear()
    .domain(xDomain)
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

//Draw x axis
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')') //moves down to bottom of svg
    .call(xAxis)
    .append('text')
    .attr('x', width / 2.5)
    .attr('y', 35)
    .text('Time Spent')


//Build Y Axis
var y = d3.scale.linear()
    .domain([yDomain[0], 100])
    .range([height, 0]); //backwards because of svg coordinates

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

//Draw Y Axis
svg.append('g')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .style('text-anchor', 'end')
    .attr('x', -height / 2.4)
    .attr('y', -35)
    .text('Skills')


//dot colors
var colorDomain = d3.extent(data, function(d) {
    return d.frustration;
});
//color scale
var color = d3.scale.linear()
    .domain(colorDomain)
    .range(['#4130ff', '#730001']);


var radius = d3.scale.linear()
    .domain(d3.extent(data,function(d){
    	return d.caffeineInSystem;
    }))
    .range(['10px', '40px']);

//Add Dots

var dots = svg.selectAll('dots')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return x(d.time)
    })
    .attr('cy', function(d) {
        return y(d.skills)
    })
    // .attr('r','10px')
    .attr('r', function(d) {
        return radius(d.caffeineInSystem);
    })
    .attr('fill', function(d) {
        return color(d.frustration)
    })
    .style('opacity', '.9')
    