import * as d3 from "d3";

export function createBarChart(data) {
  const aggregatedData = d3.rollup(
    data,
    group => d3.sum(group, d => d.properties.amount),
    d => d.properties.category
  );

  const aggregatedArray = Array.from(aggregatedData, ([category, amount]) => ({
    category,
    amount
  }));

  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  const minValue = Math.min(d3.min(aggregatedArray, d => d.amount), 0);

  const yScale = d3.scaleLinear()
    .domain([minValue, d3.max(aggregatedArray, d => d.amount)])
    .range([height - margin.bottom, margin.top])
    .nice();

  const xScale = d3.scaleBand()
    .domain(aggregatedArray.map(d => d.category))
    .range([0, width])
    .padding(0.1);

  const yAxis = d3.axisLeft(yScale);

  const xAxis = d3.axisBottom(xScale);

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bars = svg.selectAll(".bar")
    .data(aggregatedArray)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.category))
    .attr("y", d => (d.amount >= 0) ? yScale(d.amount) : yScale(0))
    .attr("width", xScale.bandwidth())
    .style("stroke", "black")
    .attr("height", d => Math.abs(yScale(d.amount) - yScale(0)))
    .attr("fill", d => (d.amount >= 0) ? "steelblue" : "red");

  svg.append("g")
    .call(yAxis);

  svg.append("g")
    .attr("transform", `translate(0, ${yScale(0)})`)
    .call(xAxis)
    .selectAll(".tick text")
    .remove();

  const categoryLabels = svg.append("g")
  .attr("class", "category-labels")
  .attr("transform", `translate(0, ${height - margin.bottom + 10})`); 
  
  categoryLabels.selectAll(".category-label")
    .data(aggregatedArray)
    .enter()
    .append("text")
    .attr("class", "category-label")
    .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "12px")
    .text(d => d.category);    

  svg.selectAll(".label")
    .data(aggregatedArray)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
    .attr("y", d => (d.amount >= 0) ? yScale(0) - 5 : yScale(0) + 15)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "12px")    
    .text(d => d3.format(".2f")(d.amount));
  
  svg.selectAll(".label")
    .data(aggregatedArray)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
    .attr("y", d => (d.amount >= 0) ? yScale(d.amount) - 15 : yScale(d.amount) + 15)
    .attr("text-anchor", "middle")
    .text(d => d3.format(d.category));

  return bars;
}