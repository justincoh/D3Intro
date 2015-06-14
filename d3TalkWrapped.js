var	data = [
	{ time:0, skills:0, frustration:0},
	{ time:1, skills:2, frustration:20},
	{ time:2, skills:3, frustration:50},
	{ time:3, skills:4, frustration:90},
	{ time:4, skills:6, frustration:70},
	{ time:5, skills:12, frustration:50},
	{ time:6, skills:18, frustration:20},
	{ time:7, skills:28, frustration:10},
	{ time:8, skills:47, frustration:5},
	{ time:9, skills:61, frustration:50},
	{ time:10, skills:66, frustration:80},
];

var width = 800,
	height = 600;

var xMeasure='time';

//Create the SVG 
var update = function() {
    d3.select('svg').remove();

    console.log('MEASURE',xMeasure==='time')
    xMeasure = xMeasure === 'time' ? 'frustration':'time';

    var svg = d3.select('.chart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('overflow', 'visible')

    //Touch on max/min, use extent
    var xDomain = d3.extent(data, function(d) {
        return d[xMeasure];
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
        .text(xMeasure)


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
    var color = d3.scale.linear()
        .domain(colorDomain)
        .range(['#4130ff', '#730001']);


    var testScale = d3.scale.linear()
        .domain(colorDomain)
        .range(['10px', '40px'])
        //Add Dots
    var dots = svg.selectAll('dots')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return x(d[xMeasure])
        })
        .attr('cy', function(d) {
            return y(d.skills)
        })
        // .attr('r','10px')
        .attr('r', function(d) {
            return testScale(d.frustration);
        })
        .attr('fill', function(d) {
            return color(d.frustration)
        })
        .style('opacity', '.7')
}

update();

var button = d3.select('button')
    .on('click',update)

// //For slides
// //straight from source
// scale.domain = function(x) {
// 	if (!arguments.length) return domain;
// 	domain = x.map(Number);
// 	return rescale();
// };