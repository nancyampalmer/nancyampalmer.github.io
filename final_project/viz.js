var height = 400;
var width = 700;

var margin = {
    top:10,
    right:0,
    bottom:50,
    left:225
};

var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;
var chartBottom = height - margin.bottom;
var authorHeight = margin.top + 33;
var titleHeight = margin.top + 50;



var svg = d3.select("#chart")
    .attr("height", height)
    .attr("width", width);

svg.append("text")
    .attr("transform", "translate(" + chartWidth + "," + (chartBottom + 40) + ")")
    .attr("class", "xAxisLabel")
    .style("text-anchor", "middle")
    .text("weeks on the list");

function drawBars(dataArray, maxWeeks) {

    console.log(dataArray);

    var rank = function(d) {
        return d.rank 
    };

    var barWidth = function(d) {
        return xScale(d.weeks_on_list)
    };

    var xScale = d3.scaleLinear()
        .domain([0, maxWeeks])
        .range([0, chartWidth]);

    var barHeight = d3.scaleBand()
        .domain(dataArray.map(rank))
        .range([0,chartHeight])
        .paddingInner(0.1)
        .paddingOuter(0.2);

    // x-axis
    var xAxis = svg.select("#x")
        .call(d3.axisBottom(xScale)
        .tickSize(-chartHeight))
        .attr("transform", "translate(" + margin.left + ", " + chartBottom + ")");
    
    xAxis.select(".domain").remove();
    
    // y-axis
    var yAxis = d3.axisLeft(barHeight);

    svg.select("#y")
        .call(yAxis)
        .attr("transform", "translate(15, " + margin.top + ")")
        .selectAll(".domain, .tick line")
            .remove();

    
    // bind data + bars
    var bars = svg.select("#marks").selectAll(".mark")
    .data(dataArray, function(d) {
        return d.title;
    });

    // bars enter
    bars.enter().append("rect")
        .attr("class", "mark")
        .attr("fill", "white")
        .attr("height", barHeight.bandwidth())
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("x", xScale(0))
        .attr("y", function (d) {
            return barHeight (d.rank);
        })
        .attr("width", 0)
        .transition().duration(800)
            .attr("width", barWidth);


    bars.transition().duration(800)
        .attr ("width", barWidth)
        .attr("y", function (d) {
            return barHeight (d.rank);
        });

    // // bars exit
    bars.exit()
        .transition().duration(400)
        .attr("width",0)
        .remove();

    // labels enter/update/exit
        var authors=svg.select("#labels").selectAll(".authorLabel")
            .data(dataArray, function(d){
                return d.author;
            });

        authors.enter().append("text")
            .attr("class", "authorLabel")
            .attr("x", xScale(0))
            .attr("y", function (d) {
                return barHeight (d.rank);
            })
            .attr("transform", "translate(15, " + authorHeight + ")")
            .style('fill', 'white')
            .text(function(d) {
                return d.author
            });


        authors.transition().duration(800)
            .attr("y", function (d) {
                return barHeight (d.rank);
            });
        
        authors.exit()
            .remove();
        
        var titles = svg.select("#labels").selectAll(".titleLabel")
            .data(dataArray, function(d){
                return d.title;
            });
    
        titles.enter().append("text")
            .attr("class", "titleLabel")
            .attr("x", xScale(0))
            .attr("y", function(d) {
                return barHeight(d.rank)
            })
            .attr("transform", "translate(15, " + titleHeight + ")")
            .style('fill', 'white')
            .text(function(d){
                return d.title
            });
        
        titles.transition().duration(800)
            .attr("y", function(d){
                return barHeight (d.rank);
            });
        
        titles.exit()
            .remove();
        
}



