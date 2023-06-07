import * as d3 from 'd3';
import { timeFormat } from 'd3-time-format';

export function drawChart(data, chartContainer) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const maxTravelDurationSeconds = d3.max(data, (d) => +d.travelDuration);
  const maxTravelDurationHours = maxTravelDurationSeconds / 3600;
  const maxYValue = maxTravelDurationHours + 10;

  const svg = d3
    .select(chartContainer)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((d) => getDayOfWeek(d.date)));

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, maxYValue]);

  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale).ticks(10).tickFormat(d3.format('d')));

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(getDayOfWeek(d.date)))
    .attr('y', (d) => yScale(+d.travelDuration / 3600))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height - yScale(+d.travelDuration / 3600))
    .style('fill', '#0079FF')
    .style('stroke', 'gray');

  const filteredData = data.filter((d) => +d.travelDuration > 0);
  const averageDuration = d3.mean(filteredData, (d) => +d.travelDuration / 3600);

  svg
    .append('line')
    .attr('class', 'average-line')
    .attr('x1', 0)
    .attr('y1', yScale(averageDuration))
    .attr('x2', width)
    .attr('y2', yScale(averageDuration))
    .style('stroke', 'black')
    .style('stroke-width', 2)

  svg
    .append('text')
    .attr('class', 'average-label')
    .attr('x', width - 5)
    .attr('y', yScale(averageDuration) + 5)
    .attr('dy', 5)
    .style('text-anchor', 'start')
    .style('font-size', '10px')
    .style('fill', 'black')
    .text(`Avg`);


    svg
    .append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left )
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Hours spent in traffic')
    .style('font-size', '12px');
}

export function updateChart(data, selectedWeek, chartContainer) {
  const weekData = data.slice(selectedWeek * 7, selectedWeek * 7 + 7);
  const svg = d3.select(chartContainer).select('svg');

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = svg.attr('width') - margin.left - margin.right;
  const height = svg.attr('height') - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(weekData.map((d) => getDayOfWeek(d.date)));

  const maxTravelDurationMinutes = d3.max(data, (d) => +d.travelDuration);
  const maxTravelDurationHours = maxTravelDurationMinutes / 3600;
  const maxYValue = maxTravelDurationHours + 10;

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, maxYValue]);

  svg.select('.x-axis').call(d3.axisBottom(xScale));
  svg.select('.y-axis').call(d3.axisLeft(yScale).ticks(10).tickFormat(d3.format('d')));

  const bars = svg.selectAll('.bar').data(weekData, (d) => d.date);

  bars.exit().remove();

  bars
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .merge(bars)
    .attr('x', (d) => margin.left + xScale(getDayOfWeek(d.date)))
    .attr('y', (d) => margin.top + yScale(+d.travelDuration / 3600))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height - yScale(+d.travelDuration / 3600))
    .style('fill', '#0079FF')
    ;

  const filteredWeekData = weekData.filter((d) => +d.travelDuration > 0);
  const averageDuration = d3.mean(filteredWeekData, (d) => +d.travelDuration / 3600);

  svg.selectAll('.average-line').remove();

  svg
    .append('line')
    .attr('class', 'average-line')
    .attr('x1', margin.left)
    .attr('y1', margin.top + yScale(averageDuration))
    .attr('x2', margin.left + width)
    .attr('y2', margin.top + yScale(averageDuration))
    .style('stroke', 'black')
    .style('stroke-width', 2)

  svg.selectAll('.average-label').remove();

  svg
    .append('text')
    .attr('class', 'average-label')
    .attr('x', margin.left + width - 5)
    .attr('y', margin.top + yScale(averageDuration) + 5)
    .attr('dy', 5)
    .style('text-anchor', 'start')
    .style('font-size', '10px')
    .style('fill', 'black')
    .text(`Avg`);

}


function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const formatDayOfWeek = timeFormat('%A');
  return formatDayOfWeek(date);
}