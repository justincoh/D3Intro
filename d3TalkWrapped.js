var width = 800,
    height = 600;

var xMeasure = 'frustration';
//Create the SVG 
var svg = d3.select('.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('overflow', 'visible')


var yDomain = d3.extent(data, function(d) {
    return d.skills;
});

//dot colors
var colorDomain = d3.extent(data, function(d) {
    return d.frustration;
});
var color = d3.scale.linear()
    .domain(colorDomain)
    .range(['#4130ff', '#730001']);

//radius sizing
var radius = d3.scale.linear()
    .domain(d3.extent(data,function(d){return d.caffeineInSystem;}))
    .range(['5px', '50px'])

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

//Add Dots
var dots = svg.selectAll('dots')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', function(d) {
        return color(d.frustration)
    })
    .style('opacity', '.9')

var update = function() {
    xMeasure = xMeasure === 'time' ? 'frustration' : 'time';
    //Touch on max/min, use extent
    var xDomain = d3.extent(data, function(d) {
        return d[xMeasure];
    });

    //Build x Axis
    var x = d3.scale.linear()
        .domain(xDomain)
        .range([0, width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    //Draw x axis
    d3.select('.x-axis').remove()
    var xAxisPath = svg.append('g')
        .attr('class','x-axis')
        .call(xAxis)
        .attr('transform', 'translate(0,' + height + ')') //moves down to bottom of svg
        .append('text')
        .transition().duration(1000)
        .attr('x', width / 2.5)
        .attr('y', 35)
        .text(xMeasure)


    dots
        .transition().duration(1000)
        .attr('cx', function(d) {
            return x(d[xMeasure])
        })
        .attr('cy', function(d) {
            return y(d.skills)
        })
        .attr('r', function(d) {
            return radius(d.caffeineInSystem);
        })
        
}

update();

d3.select('button')
    .on('click', update);
