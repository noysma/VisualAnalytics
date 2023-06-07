import * as d3 from 'd3';

export function createScatterplot(data) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 700 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3
    .select("#turnover")
    .append("svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.hourlyRate) + 10])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.counts) + 5])
    .range([height, 0]);

  const xAxis = d3.axisBottom(x).tickValues(d3.range(0, d3.max(data, d => +d.hourlyRate) + 11, 10));
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", 27)
    .attr("fill", "#000")
    .style("text-anchor", "middle")
    .text("Hourly wage")
    .style("font-size", "12px");

  const yAxis = d3.axisLeft(y).tickValues(d3.range(0, d3.max(data, d => +d.counts) + 6, 5));
  svg.append('g')
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -30)
    .attr("fill", "#000")
    .style("text-anchor", "middle")
    .text("Employees leaving the company")
    .style("font-size", "12px");
    
  const circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x(+d.hourlyRate))
    .attr('cy', d => y(+d.counts))
    .attr('r', 5)
    .style('fill', 'gray')
    .style('stroke', 'darkgray');

  const tooltip = d3.select("#turnover").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  circles.on('mouseover', function (event, d) {
    d3.select(this).style('fill', 'red');


    const tooltipWidth = parseFloat(tooltip.style("width"));
    const tooltipHeight = parseFloat(tooltip.style("height"));
    const xPosition = x(+d.hourlyRate) + margin.left -tooltipWidth / 2;
    const yPosition = event.pageY - tooltipHeight - 100;

    tooltip.transition()
      .duration(500)
      .style("opacity", 0.9)
      .style("left", xPosition + 170 + "px")
      .style("top", yPosition + 50 + "px");

    tooltip.html(`Job ID: ${+d.jobId}<br>Employees leaving this company: ${d.counts}<br>Hourly wage: ${d.hourlyRate}`);

    svg.append('line')
      .attr('x1', x(+d.hourlyRate))
      .attr('y1', height)
      .attr('x2', x(+d.hourlyRate))
      .attr('y2', y(+d.counts))
      .style('stroke', 'black')
      .style('stroke-dasharray', '2,2');

    svg.append('line')
      .attr('x1', 0)
      .attr('y1', y(+d.counts))
      .attr('x2', x(+d.hourlyRate))
      .attr('y2', y(+d.counts))
      .style('stroke', 'black')
      .style('stroke-dasharray', '2,2');
  });

  circles.on('mouseout', function () {
    d3.select(this).style('fill', 'gray');

    tooltip.transition()
      .duration(200)
      .style('opacity', 0);

    svg.selectAll('line').remove();
  });
}
